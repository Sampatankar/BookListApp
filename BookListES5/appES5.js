//Book Constructor:
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor:
function UI() {}

//Add book to the list:
UI.prototype.addBookToList = function(book){
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

//Show Alert:
UI.prototype.showAlert = function(message, className) {
  //Create Div:
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
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

//Delete Book function:
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

//Clear Fields function:
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//Event Listeners:
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values:
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
  
  //Instantiate a new book:
  const book = new Book(title, author, isbn);

  //Instantiate a UI object:
  const ui = new UI();

  //validate:
  if(title === '' || author === '' || isbn === '') {
    //Error alert:
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    //Add book to the list:
    ui.addBookToList(book);

    //Show a 'success' alert:
    ui.showAlert('Book Added!', 'success');

    //Clear fields:
    ui.clearFields(); 
  }

  e.preventDefault();
});

//Event Listener for delete:
document.getElementById('book-list').addEventListener('click', function(e){
  //Instantiate a UI object:
  const ui = new UI();

  //delete the target book:
  ui.deleteBook(e.target);

  //show an alert message on delete:
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});