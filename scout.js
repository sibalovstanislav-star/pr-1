// scout.js — набор функций, которые только читают DOM (ничего не меняют).

// 1. Возвращает массив всех строк таблицы с классом .book
function getBookRows() {
  // querySelectorAll возвращает NodeList, [...] превращает его в массив
  return [...document.querySelectorAll("tr.book")];
}

// 2. Ищет строку по data-id. Если не найдет — вернет null.
function getRowByBookId(id) {
  // Шаблонная строка позволяет подставить id прямо в селектор
  return document.querySelector(`tr.book[data-id="${id}"]`);
}

// 3. Возвращает массив названий только доступных книг
function getAvailableTitles() {
  // Берем строки, где data-available="true"
  return [...document.querySelectorAll("tr.book[data-available='true']")]
    // И вытаскиваем текст из ячейки с классом .title
    .map(row => row.querySelector(".title").textContent.trim());
}

// 4. Ищет книги по автору (без учета регистра)
function findByAuthor(text) {
  const needle = text.toLowerCase(); // Переводим искомый текст в нижний регистр
  
  return [...document.querySelectorAll("tr.book")]
    // Оставляем только те строки, где автор (текст в .author) содержит искомый текст
    .filter(row => row.querySelector(".author").textContent.toLowerCase().includes(needle))
    // И возвращаем названия этих книг
    .map(row => row.querySelector(".title").textContent.trim());
}

// 5. Находит строку таблицы, в которой лежит кнопка
function getRowFromButton(btn) {
  // closest("tr") поднимается вверх по дереву DOM от кнопки до ближайшего <tr>
  return btn.closest("tr");
}

// 6. Читает таблицу и возвращает массив объектов
function readBooks() {
  return getBookRows().map(row => ({
    id: Number(row.dataset.id), // Берем data-id и превращаем в число
    title: row.querySelector(".title").textContent.trim(),
    author: row.querySelector(".author").textContent.trim(),
    year: parseInt(row.querySelector(".year").textContent, 10), // Вытаскиваем число года
    genre: row.dataset.genre,
    available: row.dataset.available === "true", // Превращаем строку в boolean
  }));
}