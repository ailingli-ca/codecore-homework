$(document).ready(() => {
    $("table.letters td").on("click", event => {
      $(event.currentTarget).addClass("selected");
    });
});