window.onload = () => {
  const parser = new DOMParser();
  const booksContainer = document.querySelector('.container-book');
  const addBtn = document.querySelector('.add-btn');  

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
    localStorage.setItem('bookKey', JSON.stringify(bookArray));
    showBooks();
  }

  const entireJSON = localStorage.getItem('bookKey');

  if (entireJSON) {
    bookArray = JSON.parse(entireJSON);
    showBooks();
  }

  function showBooks() {
    booksContainer.innerHTML = '';
    bookArray.forEach((e, i) => {
      const newBook = `
      <div>
        <p>${e.title}</p>
        <p>${e.author}</p>
        <button type="button" class="remove-btn" myIndex ="${i}" >Remove</button>
      </div>
      `;
      const newBookElement = parser.parseFromString(
        newBook,
        'text/html',
      ).body.firstChild;
      console.log(newBookElement);
      const removeBtn = newBookElement.querySelector('.remove-btn');
      removeBtn.addEventListener('click', (e) => {
        removeBook(e, newBookElement);
      });
      booksContainer.append(newBookElement);
      const horline = document.createElement('hr');
      booksContainer.append(horline);
    });
  }

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const book = new Book(title, author);
    bookArray.push(book);
    showBooks();
    localStorage.setItem('bookKey', JSON.stringify(bookArray));
    document.querySelector('.title').value = '';
    document.querySelector('.author').value = '';
  });
};