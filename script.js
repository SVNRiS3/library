const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? 'read' : 'not read yet';
  }

  info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
  //Create book card from object
  createElement = function (bookNr) {
    const element = document.createElement('div');
    element.classList.add('card');
    element.setAttribute('data-id', bookNr);
    for (let property in this) {
      if (typeof this[property] === 'function') continue;

      let propertyElement = document.createElement('div');
      propertyElement.classList.add(property);
      propertyElement.textContent = this[property];
      element.appendChild(propertyElement);
    }

    element.appendChild(createCardControls());

    return element;
  };
}

function createCardControls() {
  const controlsImgs = [
    ['img/read.svg', 'read'],
    ['img/edit.svg', 'edit'],
    ['img/delete.svg', 'delete'],
  ];
  const controlsElement = document.createElement('div');
  controlsElement.classList.add('card-controls');
  for (imgWAlt of controlsImgs) {
    const controlButton = document.createElement('button');
    const controlImg = document.createElement('img');
    controlImg.src = imgWAlt[0];
    controlImg.alt = imgWAlt[1];
    controlButton.appendChild(controlImg);
    controlsElement.appendChild(controlButton);
  }
  return controlsElement;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  return newBook;
}
//Sample books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', false);
addBookToLibrary('A Man Called Ove', 'Fredrik Backman', '337', true);
addBookToLibrary('Brave New World', 'Aldous Huxley', '268', true);
addBookToLibrary(
  'The Shadow of the Wind',
  'Carlos Ruiz Zafón',
  '487',
  true
);
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', false, 5);
addBookToLibrary('A Man Called Ove', 'Fredrik Backman', '337', true, 6);
addBookToLibrary('Brave New World', 'Aldous Huxley', '268', true, 7);
addBookToLibrary(
  'The Shadow of the Wind',
  'Carlos Ruiz Zafón',
  '487',
  true,
  8
);
//Add book cards to the webpage
const mainContent = document.querySelector('.main');

let bookNr = 0;
for (book of myLibrary) {
  mainContent.appendChild(book.createElement(bookNr++));
}

//Add "pages" word to book cards
const pages = document.querySelectorAll('.pages');
pages.forEach((page) => (page.textContent += ' pages'));

const dialog = document.querySelector('.dialog');
const addBookButton = document.querySelector('.add-book');
const cancelDialog = document.querySelector('.cancel-dialog');
const addBookForm = document.querySelector('dialog form');
const readLabels = document.querySelectorAll('.fieldset label');
const pagesField = document.querySelector('#pages');
const searchBox = document.querySelector("input[type='search'");
const cardControls = document.querySelectorAll('.card-controls');
const Fields = addBookForm.querySelectorAll('dialog input');
const Radios = addBookForm.querySelectorAll('input[type="radio"]');

function checkIfEmptyRadio() {
  const isRadioChecked =
    Radios[0].checked || Radios[1].checked ? true : false;
  if (isRadioChecked) {
    Radios.forEach((radio) => radio.classList.remove('empty'));
  } else {
    Radios.forEach((radio) => radio.classList.add('empty'));
  }
}

Radios.forEach((radio) =>
  radio.addEventListener('click', checkIfEmptyRadio)
);

function checkIfEmpty(Field) {
  Field.value === ''
    ? Field.classList.add('empty')
    : Field.classList.remove('empty');
}

Fields.forEach((Field) => {
  Field.addEventListener('input', (event) => {
    checkIfEmpty(Field);
  });
});

addBookForm.addEventListener('submit', (event) => {
  Fields.forEach((Field) => {
    checkIfEmpty(Field);
    checkIfEmptyRadio();
    if (Field.classList.contains('empty')) event.preventDefault();
  });
});

//open dialog box after clicking "Add book" button and reset it
addBookButton.addEventListener('click', () => {
  readLabels.forEach((label) => label.classList.remove('active'));
  addBookForm.reset();
  dialog.showModal();
});

//Close dialog without adding a book
cancelDialog.addEventListener('click', (event) => {
  event.preventDefault();
  dialog.close();
  addBookButton.focus();
});

//Implement working read buttons
readLabels.forEach((label) => {
  label.addEventListener('click', (event) => {
    readLabels.forEach((label) => label.classList.remove('active'));
    event.target.classList.add('active');
  });
});

//Limit pages field to numbers only
pagesField.addEventListener('input', (event) => {
  event.target.value = event.target.value.replace(/\D/g, '');
});

//Implement search by title or author feature
searchBox.addEventListener('input', (event) => {
  let searchQuery = '' + event.target.value.toLowerCase();
  mainContent.childNodes.forEach((card) => {
    card.classList.remove('hidden');
    if (
      !(
        card
          .querySelector('.title')
          .textContent.toLowerCase()
          .includes(searchQuery) ||
        card
          .querySelector('.author')
          .textContent.toLowerCase()
          .includes(searchQuery)
      )
    ) {
      card.classList.add('hidden');
    }
  });
});

function findValue(objectToSearch, queryToSearch) {
  return objectToSearch.querySelector(queryToSearch).value;
}

addBookForm.addEventListener('submit', (event) => {
  const newBook = addBookToLibrary(
    findValue(addBookForm, '#title'),
    findValue(addBookForm, '#author'),
    findValue(addBookForm, '#pages'),
    +findValue(addBookForm, "[name='readState']:checked")
  );
  mainContent.appendChild(newBook.createElement());
});

cardControls.forEach((control) => {
  control.addEventListener('click', (event) => {
    let controlClicked = event.target.alt
      ? event.target.alt
      : event.target.childNodes[0].alt;
    let bookId = control.parentElement.getAttribute('data-id');
    // console.log(event.target.closest(".card"));
    switch (controlClicked) {
      case 'read':
        let book = myLibrary[bookId];
        let cardReadStatus = control.previousSibling;
        if (book.read === 'read') {
          book.read = 'not read yet';
          cardReadStatus.textContent = 'not read yet';
        } else {
          book.read = 'read';
          cardReadStatus.textContent = 'read';
        }
        break;
      case 'edit':
        //TODO
        break;
      case 'delete':
        //using delete instead of splice to keep the book ids' on the
        //page and in the array the same
        delete myLibrary[bookId];
        control.parentElement.remove();
        break;
    }
  });
});
