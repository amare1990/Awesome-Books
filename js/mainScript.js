const containerBook = document.createElement('.container-book');
//const titleInput = document.querySelector('.title');
//const authorInput = document.querySelector('.author');

const addBtn = document.querySelector('.add-btn');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const bookArray = [];

addBtn.addEventListener('click', function (e) {
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  const book = new Book(title, author);
  bookArray.push(book);
  showBooks();
  document.querySelector('.title').value = '';
  document.querySelector('.author').value = '';
  syncStorage();
});