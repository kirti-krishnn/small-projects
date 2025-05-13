'use strict';

const btn_modal = document.querySelectorAll('.show-modal');

const btn_close = document.querySelector('.close-modal');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

for (let i = 0; i < btn_modal.length; i++) {
  console.log(btn_modal[i]);
  btn_modal[i].addEventListener('click', openModal);
}

overlay.addEventListener('click', closeModal);
btn_close.addEventListener('click', closeModal);
