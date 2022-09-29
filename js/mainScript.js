const booksContainer = document.querySelector('.container-book');
// const titleInput = document.querySelector('.title');
// const authorInput = document.querySelector('.author');

const addBtn = document.querySelector('.add-btn');
const parser = new DOMParser();

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

let bookArray = [];

function removeBook(e, newBookElement) {
  const index = e.target.getAttribute('myIndex');

  function checkBtnclicked(element, i) {
    if (i === parseInt(index, 10)) {
      return false;
    }
    return true;
  }

  bookArray = bookArray.filter(checkBtnclicked);
  newBookElement.remove();
}

const entireJSON = localStorage.getItem('bookKey');
function syncStorage() {
  if (entireJSON != null) {
    localStorage.setItem('bookKey', entireJSON.concat(JSON.stringify(bookArray)));
  } else {
    localStorage.setItem('bookKey', entireJSON);
  }
}

function showBooks() {
  booksContainer.innerHTML = '';
  bookArray.forEach((e, i) => {
    const newBook = document.createElement('div');
    newBook.innerHTML = `
    <div>
      <p>${e.title}</p>
      <p>${e.author}</p>
      <button type="button" class="remove-btn" myIndex ="${i}" >Remove</button>
    </div>
    `;
    const newBookElement = parser.parseFromString(
      newBook.innerHTML,
      'text/html',
    ).body.firstChild;
    const removeBtn = newBookElement.querySelector('.remove-btn');
    removeBtn.addEventListener('click', (e) => {
      removeBook(e, newBookElement);
      syncStorage();
    });
    booksContainer.append(newBookElement);
    const horline = document.createElement('hr');
    booksContainer.append(horline);
  });
}

addBtn.addEventListener('click', () => {
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  const book = new Book(title, author);
  bookArray.push(book);
  showBooks();
  document.querySelector('.title').value = '';
  document.querySelector('.author').value = '';
  syncStorage();
});

window.onload = () => {
  const bookObj = localStorage.getItem('bookKey');
  console.log(bookObj);
  // showBooks();
};
