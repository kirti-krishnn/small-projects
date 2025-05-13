'use strict';

const btn_again = document.querySelector('.again');
const btn_check = document.querySelector('.check');
const label_message = document.querySelector('.message');

const label_highScore = document.querySelector('.highscore');

const label_score = document.querySelector('.score');
const label_number = document.querySelector('.number');

let guess_number;

let secret_number = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

console.log(secret_number);

btn_check.addEventListener('click', function () {
  guess_number = document.querySelector('.guess').value;
  if (guess_number * 1 == secret_number) {
    label_number.textContent = secret_number;
    label_message.textContent =
      'you guessed it right. Congratulations!!!🎉Press Again button if you wish to play again....';
    label_score.textContent = score;
    highscore = highscore > score ? highscore : score;
    console.log(highscore);
    label_highScore.textContent = highscore;
    document.querySelector('body').style.backgroundColor = ' #60b347';
    document.querySelector('.guess').disabled = true;
    score = 20;
  } else {
    score = score - 1;
    if (guess_number * 1 > secret_number) {
      label_score.textContent = score;
      label_message.textContent = 'your guess is high';
    } else {
      label_score.textContent = score;
      label_message.textContent = 'your guess is low';
    }
  }
});

btn_again.addEventListener('click', function () {
  secret_number = Math.trunc(Math.random() * 20) + 1;
  console.log(secret_number);
  label_score.textContent = 20;
  label_message.textContent = 'Start guessing...';
  label_number.textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = ' #222';
});
