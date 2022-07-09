const express = require('express');
const knex = require('../db/client');

const router = express.Router();

//-------------- Index to List Cohorts
router.get('/', (req,res) => {
    knex('cohorts')
    .orderBy('created_at', 'desc')
    .then(cohorts => {
      res.render('cohorts/index', {cohorts: cohorts})
    })
  })

//-------------- Create New Cohorts
router.get('/new', (req, res) => {
    res.render('cohorts/new', { cohort: false });
})

router.post('/', (req, res) => {
    knex('cohorts')
    .insert({
      logoUrl: req.body.logoUrl,
      name: req.body.name,
      members: req.body.members
    })
    .returning('*')
    .then(cohorts => {
      const cohort = cohorts[0]
      res.redirect(`cohorts/${cohort.id}`)
    })
  })

//-------------- Show a Single Cohort
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function assignTeams(method, quantity, members) {
  let names = members.split(",");

  names.forEach((name, index, names) => {
    names[index] = name.trim();
  });

  names = shuffle(names);


  let teams = [];
  if (method == "TeamCount") {
    while (names.length > 0 && quantity > 0) {
      for (let i = 0; i < quantity && names.length > 0; i++) {
        teams[i] = teams[i] ? teams[i] + ", " + names.pop() : names.pop();
      }
    }
  } else if (method == "NumberPerTeam") {
    for (let j = 0; names.length > 0 && quantity > 0; j++) {
      for (let i = 0; i < quantity && names.length > 0; i++) {
        teams[j] = teams[j] ? teams[j] + ", " + names.pop() : names.pop();
      }
    }
  }
  return teams;
}
router.get('/:id', (req, res) => {
    knex('cohorts')
    .where('id', req.params.id)
    .first() 
    .then(cohort => {
      if (!cohort) {
        res.send('No cohort found')
      } else {
        let quantity = parseInt(req.query.quantity, 10);
        if (isNaN(quantity)|| quantity == "") {
          quantity = 0
        }
        let method = req.query.method? req.query.method: "";
        res.render("cohorts/show", {
          cohort: cohort,
          method: method,
          quantity: quantity,
          teams: assignTeams(
            method,
            quantity,
            cohort.members
          ),
        });
      }
    });
});


//-------------- Edit Cohorts
router.get('/:id/edit', (req, res) => {
    knex('cohorts')
    .where('id', req.params.id)
    .first()
    .then(cohort => {
      res.render('cohorts/edit', {cohort: cohort})
    })
})

router.patch('/:id', (req, res) => {
    knex('cohorts')
    .where('id', req.params.id)
    .update({
        logoUrl: req.body.logoUrl,
        name: req.body.name,
        members: req.body.members
    })
    .then(() => {
        res.redirect(`/cohorts/${req.params.id}`)
    })
})

//-------------- Delete Cohorts
router.delete("/:id", (req, res) => {
    knex('cohorts')
    .where('id', req.params.id)
    .del()
    .then(() => {
      res.redirect('/cohorts')
    })
})


module.exports = router;
