

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
        const StoredBooks = [
            {
                title: 'Harry Potter',
                author: 'J.K.Rowling',
                pages: '246'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }
//add books to list
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

    static clearFields() {
        document.querySelector('#bookTitle').value = '';
        document.querySelector('#bookAuthor').value = '';
        document.querySelector('#bookPages').value = '';
    }
}

//display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//add a book
document.querySelector('#form').addEventListener('submit', (e) =>
 {  

    //prevent submitting
    e.preventDefault();

     //values from the form
     const title = document.querySelector('#bookTitle').value;
     const author = document.querySelector('#bookAuthor').value;
     const pages = document.querySelector('#bookPages').value;
     

     //instantiate book
     const book = new Book(title, author, pages);

    //add book to ui
    UI.addBookToList(book);

    //clear input fields
    UI.clearFields();
 }
);

//remove a book from list
document.querySelector('#book-list').addEventListener('click' , (e) =>
    {
        console.log(e.target)
    }
)






/*
function addBookToLibrary() {
    form.addEventListener('submit', (e) => {
        myLibrary.push(new Book(title, author, pages, status))

    })
    
}

addBookToLibrary();
*/