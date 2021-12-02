import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store.js';
import App from './app.js';

const root = document.getElementById("app");

const items = [
  {code: 1, title: 'Название элемента'},
  {code: 2, title: 'Некий объект'},
  {code: 3, title: 'Заголовок'},
  {code: 4, title: 'Короткое название'},
  {code: 5, title: 'Запись'},
  {code: 6, title: 'Пример названия'},
  {code: 7, title: 'Седьмой'}
];

items.forEach(item => item.selectCount = 0);

// Состояние приложения
const store = new Store({
  items
});

// Сообщаем реакту что и куда рендерить.
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, root);
});

// Сообщаем реакту что и куда рендерить.
ReactDOM.render(<App store={store}/>, root);
