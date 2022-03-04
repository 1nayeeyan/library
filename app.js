

//Book class and constructor
class Book{
    constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    }
}

//User Interface methods
class UI {
    static displayBooks() {
        const books = Store.getBooks();

        //display each book that is stored (if it is)
        books.forEach((book) => UI.addBookToList(book));
    }
//add books to table in HTML
    static addBookToList(book){
        const List = document.getElementById('book-list');
        const row = document.createElement('tr');
//create row in table with each books information in each
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete"> X </td>
        `;

        List.appendChild(row)
    }

// delete book from list by targeting the row and deleting row from dom
    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
// show validation errors on UI
//create div with boostrap class depending on if validation is succesful or not
    static missingField(prompt, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(prompt));
        const container = document.querySelector('.sidebar');
        const form = document.querySelector('#form');
        container.insertBefore(div, form);
    //Delete message after 5 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 5000);
    }

//deleting values in input after they've already been inputed
    static clearFields() {
        document.querySelector('#bookTitle').value = '';
        document.querySelector('#bookAuthor').value = '';
        document.querySelector('#bookPages').value = '';
    }
}

//store books on local storage
//store book as string (objects can't be added to local storage),
//then create book object from strings stored
class Store {
    static getBooks(){
        let books;
        //if no books stored, empty array
        if (localStorage.getItem('books') === null) {
            books = [];
        //if books stored parse the strings into books
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books
    }

    static storeBook(book){
        //each book entered is stored on local storage in form of strings
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    //remove book from storage array based on title
    static removeBook(title){
        const books = Store.getBooks();

        books.forEach((book, index) => {

            if(book.title === title) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//add a book
document.querySelector('#form').addEventListener('submit', (e) =>
 {  

    //prevent submitting
    e.preventDefault();

     //get values from the form
     const title = document.querySelector('#bookTitle').value;
     const author = document.querySelector('#bookAuthor').value;
     const pages = document.querySelector('#bookPages').value;
     
     //validation

     if (title == '' || author == ''|pages == ''){
         UI.missingField('Please fill in all fields', 'danger')
     } else {
     //instantiate book
     const book = new Book(title, author, pages);

     //add book to ui
     UI.addBookToList(book);
    
     //add book to store
     Store.storeBook(book);

     //clear input fields
     UI.clearFields();
     }
 }
);

//remove a book from list
document.querySelector('#book-list').addEventListener('click' , (e) =>
    {
        UI.deleteBook(e.target)
        //remove book from storage by targeting delete buttons parent sibling element which is three spaces away
        Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    }
)






