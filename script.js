$(document).ready(function() {
  const words = [
    {en: "code", ua: "код"},
    {en: "bug", ua: "помилка"},
    {en: "app", ua: "додаток"},
    {en: "data", ua: "дані"},
    {en: "loop", ua: "цикл"},
    {en: "file", ua: "файл"},
    {en: "test", ua: "тест"},
    {en: "user", ua: "користувач"},
    {en: "save", ua: "зберегти"},
    {en: "input", ua: "ввід"}
  ];

  let index = 0;
  let correct = 0;
  let wrong = 0;

  const shuffled = words.sort(() => Math.random() - 0.5);

  function updateCard() {
    $("#word-card").text(shuffled[index].en);
    $("#progress").text((index + 1) + "/" + shuffled.length);
    $("#answer").val("");
  }

  updateCard();

  $("#next").click(function() {
    if (index < shuffled.length - 1) {
      index++;
      updateCard();
    }
  });

  $("#prev").click(function() {
    if (index > 0) {
      index--;
      updateCard();
    }
  });

  $("#check, #word-card").click(function() {
    const userAnswer = $("#answer").val().trim().toLowerCase();
    const correctAnswer = shuffled[index].ua;

    if (userAnswer === correctAnswer) {
      correct++;
      $("#correct").text(correct);
    } else {
      wrong++;
      $("#wrong").text(wrong);
    }

    if (index === shuffled.length - 1) {
      showResult();
    } else {
      index++;
      updateCard();
    }
  });

  function showResult() {
    const total = shuffled.length;
    const percent = Math.round((correct / total) * 100);
    let level;

    if (percent === 0) level = "Тобі слід повчити англійську та спробувати ще раз!"
    else if (percent >= 90) level = "Високий рівень знань. Відмінний результат!";
    else if (percent >= 60) level = "Середній рівень знань. Молодець!";
    else level = "Початковий рівень знань. Не засмучуйся у тебе ще все попереду!";

    $("#result-text").html(`Твій результат: ${percent}%<br>${level}`);
    $("#modal").fadeIn();
  }

  $("#restart").click(function() {
    location.reload();
  });
});
