const booksContainer = document.querySelector('.container-book');

const addBtn = document.querySelector('.add-btn');
const parser = new DOMParser();

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

var bookArray = [];

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

var entireJSON = localStorage.getItem('bookKey');
function syncStorage() {
  if (entireJSON != null) {
    //let x = JSON.parse(entireJSON).push(bookArray);
    //localStorage.setItem('bookKey', entireJSON.concat(JSON.stringify(bookArray)));
    //localStorage.setItem('bookKey', JSON.stringify(x));
    let entireObj = JSON.parse(entireJSON);
    for (let i = 0; i < bookArray.length; i++) {
      let bookObj = bookArray[i];
      entireObj.push(bookObj);
    }
    localStorage.setItem('bookKey', JSON.stringify(entireObj));
  } else {
    localStorage.setItem('bookKey', JSON.stringify(bookArray));
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

let bookJSON = localStorage.getItem('bookKey');
//let bookJSON = {};
window.onload = () => {
  //let bookJSON = localStorage.getItem('bookKey');
  console.log('bookkey at very beg ='+bookJSON);
  let bookFromStorage = document.querySelector('.book-from-storage');

  if (bookJSON != null) {
    
    let x = JSON.parse(bookJSON);
    console.log('x = '+x);
    for(let i = 0; i < x.length; i++) {
      var bookObj = x[i];
      console.log(bookObj.title);
      
      var temp = document.createElement('div');
      temp.innerHTML = `
      <div>
      <p> ${bookObj.title} </p>
      <p> ${bookObj.author} </p>
      <button type="button" class="remove-btn" myIndex ="${i}" >Remove</button>
      </div>
      `;
      bookFromStorage.append(temp)
    }
  } else {
    //localStorage.setItem('bookKey', JSON.stringify(bookArray));
    //bookJSON = null;
    
  }
  
  
  //localStorage.removeItem('bookKey');
 
};

//localStorage.removeItem('bookKey');
