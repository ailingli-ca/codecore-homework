$(document).ready(() => {
  const words = ["ARCHERY", "BADMINTON", "BASKETBALL", "BASEBALL", "BOXING", "CLIMBING", "CURLING", "FENCING", "FOOTBALL", "GOLF", "HOCKEY", "SHOOTING", "SKATING", "SKATEBOARDING", "SKIING", "SURFING", "SWIMMING", "TENNIS", "VOLLEYBALL", "YOGA"];
  const randomWord = words[Math.floor(Math.random() * words.length)];
  
  let incorrects = 0;
  let corrects = 0;
  const Total_Chances = 6;

  const victorySound = new Audio("sounds/victory.wav");
  const failSound = new Audio("sounds/failure.wav");

  for (let i = 0; i < randomWord.length; i++) {
    $("table.randomWord tr").append($(`<td></td>`));
  }

  function checkGuessLetter(guess) {
    if (randomWord.includes(guess)) {
      let i = randomWord.indexOf(guess, 0);
      while (i != -1 && i < randomWord.length) {
        corrects++;
        $(`table.randomWord td:nth-child(${i + 1})`).text(guess);
        i = randomWord.indexOf(guess, i + 1);
      }
      if (corrects === randomWord.length) {
        endingGame(victorySound, "Congratulations! You win!");
      }
    } else {
      incorrects += 1;
      $("img.hangmanImage").attr('src', `images/${incorrects}.png`);
      if (incorrects === Total_Chances) {
        endingGame(failSound, "Better luck next time...");
      }
    }
  }

  function endingGame(music, message){
    music.play();
    setTimeout(function(){
      alert(message);
      location.reload(); 
   }, 1000);
  }

  $("table.letters td").on("click", event => {
    $(event.currentTarget).addClass("selected");
    checkGuessLetter($(event.currentTarget).text());
  });

});