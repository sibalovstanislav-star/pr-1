// 1.1. ПАСПОРТ СТРАНИЦЫ (BOM)

  console.log("\n1.1.");
  
  // Полный адрес страницы
  console.log("Адрес страницы:", location.href); 
  
  // Имя файла (последняя часть пути)
  console.log("Имя файла:", location.pathname.split("/").pop()); 
  
  // Данные браузера и окна
  console.log("Язык браузера:", navigator.language);
  console.log("Ширина окна:", window.innerWidth);
  console.log("Высота окна:", window.innerHeight);
  console.log("Онлайн:", navigator.onLine); 

  // Спрашиваем имя. Если нажали "Отмена", выводим "Аноним"
  const userName = prompt("Как вас зовут?");
  console.log("Имя пользователя:", userName === null ? "Аноним" : userName);

  // Через 3 секунды прыгаем к якорю #my, еще через 3 — к #catalog
  setTimeout(() => {
    location.hash = "#my"; 
    setTimeout(() => { 
      location.hash = "#catalog";
    }, 3000);
  }, 3000);


// 1.2. КАРТА СТРАНИЦЫ (ДЕРЕВО)

  console.log("\n1.2.");
  
  const nav = document.querySelector("nav");
  // childNodes включает все узлы (даже текстовые), а children — только теги
  console.log("nav.childNodes:", nav.childNodes.length); 
  console.log("nav.children:", nav.children.length);

  const myList = document.getElementById("my-list");
  const mySection = document.getElementById("my");
  const mainEl = document.querySelector("main");

  // Сравниваем количество всех узлов и только элементов
  console.log(`#my-list: childNodes=${myList.childNodes.length}, children=${myList.children.length}`);
  console.log(`#my: childNodes=${mySection.childNodes.length}, children=${mySection.children.length}`);
  console.log(`main: childNodes=${mainEl.childNodes.length}, children=${mainEl.children.length}`);
  
  // nodeType 1 — это тег, 3 — это текст (пробелы/переносы)
  console.log("#my-list firstChild.nodeType:", myList.firstChild.nodeType);
  console.log("#my-list lastChild.nodeType:", myList.lastChild.nodeType);


// 1.3. НАВИГАЦИЯ ПО ТАБЛИЦЕ

  console.log("\n1.3.");
  
  // Получаем таблицу только один раз (по условию)
  const table = document.getElementById("books");
  const tbody = table.tBodies[0];

  // Берем 3-ю строку (индекс 2) и 2-ю ячейку (индекс 1)
  console.log("Автор третьей книги:", tbody.rows[2].cells[1].textContent.trim());
  
  // Перебираем все строки: 1-я ячейка — название, 3-я ячейка — год
  console.log("Все строки (название - год):");
  for (const row of tbody.rows) {
    console.log(`  ${row.cells[0].textContent.trim()} — ${row.cells[2].textContent.trim()}`);
  }

  // Находим последнюю строку через lastElementChild
  console.log("Последняя книга:", tbody.lastElementChild.cells[0].textContent.trim());

  // Идем по строкам через nextElementSibling и выводим data-id
  console.log("data-id всех книг:");
  let currentRow = tbody.firstElementChild; 
  while (currentRow) { 
    console.log("  data-id:", currentRow.dataset.id);
    currentRow = currentRow.nextElementSibling;
  }


// 1.4. ПОИСК СЕЛЕКТОРАМИ

  console.log("\n 1.4.");
  
  // 1. Собираем текст первой ячейки каждой строки
  console.log("1. Все названия:", [...document.querySelectorAll("#books tbody tr td:first-child")].map(td => td.textContent.trim()));
  
  // 2. Считаем строки с data-available="true"
  console.log("2. Доступных книг:", document.querySelectorAll("#books tbody tr[data-available='true']").length);
  
  // 3. Названия книг с data-available="false"
  console.log("3. Выданные книги:", [...document.querySelectorAll("#books tbody tr[data-available='false'] td:first-child")].map(td => td.textContent.trim()));
  
  // 4. Книги с жанром "Фантастика"
  console.log("4. Фантастика:", [...document.querySelectorAll("#books tbody tr[data-genre='Фантастика']")].map(r => r.cells[0].textContent.trim()));
  
  // 5. Ищем "булгаков" без учета регистра через filter
  console.log("5. Булгаков:", [...document.querySelectorAll("#books tbody tr")].filter(r => r.cells[1].textContent.toLowerCase().includes("булгаков")).map(r => r.cells[0].textContent.trim()));
  
  // 6. Последняя строка через :last-child
  console.log("6. Последняя строка:", document.querySelector("#books tbody tr:last-child").cells[0].textContent.trim());
  
  // 7. Четные строки через :nth-child(even)
  console.log("7. Чётные строки:", [...document.querySelectorAll("#books tbody tr:nth-child(even)")].map(r => r.cells[0].textContent.trim()));
  
  // 8. Заголовки, у которых есть атрибут data-sort
  console.log("8. Сортируемые заголовки:", [...document.querySelectorAll("#books th[data-sort]")].map(th => th.textContent.trim()));
  
  // 9. Ссылки, которые начинаются с # (^= означает "начинается с")
  console.log("9. Ссылки на якорь:", [...document.querySelectorAll("a[href^='#']")].map(a => a.getAttribute("href")));
  
  // 10. Поля формы с атрибутом required
  console.log("10. Обязательные поля:", [...document.querySelectorAll("#add-form [required]")].map(f => f.name || f.id));


// 1.5. ОЧИСТКА ТАБЛИЦЫ

  // Раскомментируйте один из способов и обновите страницу (F5), чтобы проверить.

  /*
  console.log("\n1.5. Очистка таблицы");
  
  // Способ 1: удаляем строки по одной
  // for (const row of [...tbody.rows]) row.remove();

  console.log('Проверка: getElementsByName("book").length =', document.getElementsByName("book").length);
  */