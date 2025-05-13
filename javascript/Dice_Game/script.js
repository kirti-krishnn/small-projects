'use strict';

const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');

const dice = document.querySelector('.dice');

//Player1
const score_0 = document.querySelector('#score--0');
const player0 = document.querySelector('.player--0');
const current_score0 = document.querySelector('#current--0');

//Player2
const score_1 = document.querySelector('#score--1');
const player1 = document.querySelector('.player--1');
const current_score1 = document.querySelector('#current--1');

let dice_num = Math.trunc(Math.random(0, 1) * 6 + 1);
let current_score,
  current_player,
  score = [0, 0],
  playing = true;

const init = function () {
  current_score = 0;
  current_player = 0;

  score_0.textContent = 0;
  score_1.textContent = 0;
  current_score0.textContent = 0;
  current_score1.textContent = 0;

  dice.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

init();
const switch_player = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');

  document.getElementById(`current--${current_player}`).textContent = 0;
  current_score = 0;
  current_player = current_player === 0 ? 1 : 0;
};

btn_roll.addEventListener('click', function () {
  if (playing) {
    dice.classList.remove('hidden');
    dice_num = Math.trunc(Math.random(0, 1) * 6 + 1);
    dice.src = `dice-${dice_num}.png`;

    if (dice_num != 1) {
      current_score = current_score + dice_num;
      document.getElementById(`current--${current_player}`).textContent =
        current_score;
    } else {
      switch_player();
    }
  }
});

btn_hold.addEventListener('click', function () {
  if (playing) {
    score[current_player] += current_score;
    document.getElementById(`score--${current_player}`).textContent =
      score[current_player];
    document.getElementById(`current--${current_player}`).textContent = 0;

    if (score[current_player] >= 100) {
      document
        .querySelector(`.player--${current_player}`)
        .classList.add('player--winner');
      player0.classList.remove('player--active');
      player1.classList.remove('player--active');
      playing = false;
    }
  } else {
    switch_player();
  }
});

btn_new.addEventListener('click', init);

console.log(dice_num);
