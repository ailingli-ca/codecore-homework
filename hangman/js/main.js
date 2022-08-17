$(document).ready(() => {
  const mysteryWord = "STRANGER";

  let incorrects = 0;
  let corrects = 0;

  for (let i = 0; i < mysteryWord.length; i++) {
    $("table.mysteryWord tr").append($(`<td></td>`));
  }

  function checkGuessLetter(guess) {
    if (mysteryWord.includes(guess)) {
      let i = mysteryWord.indexOf(guess, 0);
      while (i != -1) {
        $(`table.mysteryWord td:nth-child(${i+1})`).text(guess);
        i = mysteryWord.indexOf(guess, i + 1);
      }
    }
    else {
      incorrects += 1;
      $("img.hangmanImage").attr('src', `images/${incorrects}.png`);
    }
  }

  $("table.letters td").on("click", event => {
    $(event.currentTarget).addClass("selected");
    checkGuessLetter($(event.currentTarget).text());
  });

});