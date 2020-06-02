//Book Class:
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI class:
class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Create a tr element:
    const row = document.createElement('tr');
    //Insert Columns:
    row.innerHTML = ` 
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

    list.appendChild(row);
  }

  //Show Alert class:
  showAlert(message, className) {
    const div = document.createElement('div');
    // Add classes:
    div.className = `alert ${className}`;
    //Add text:
    div.appendChild(document.createTextNode(message));
    //Get parent:
    const container = document.querySelector('.container');
    //Get form:
    const form = document.querySelector('#book-form');
    //Insert the alert:
    container.insertBefore(div, form);

    //Timeout after 3 seconds:
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//Local Storage Class:
class Store {
  //fetch from LS:
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  //display the book from LS:
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;

      //Add book to the UI
      ui.addBookToList(book);
    });
  }

  //add the book to LS:
  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  //Remove the book from LS:
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index){
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

//DOM Load event:
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listeners: 
//(STRAIGHT GRAB FROM ES5 VERSION FROM HEREON TO BOTTOM)
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get form values:
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

  //Instantiate a new book:
  const book = new Book(title, author, isbn);

  //Instantiate a UI object:
  const ui = new UI();

  //validate:
  if (title === '' || author === '' || isbn === '') {
    //Error alert:
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    //Add book to the list:
    ui.addBookToList(book);

    //Add to the LS:
    Store.addBook(book);

    //Show a 'success' alert:
    ui.showAlert('Book Added!', 'success');

    //Clear fields:
    ui.clearFields();
  }

  e.preventDefault();
});

//Event Listener for delete:
document.getElementById('book-list').addEventListener('click', function (e) {
  //Instantiate a UI object:
  const ui = new UI();

  //delete the target book:
  ui.deleteBook(e.target);

  //Remove from LS:
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show an alert message on delete:
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});