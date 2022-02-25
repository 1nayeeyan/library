
const title = document.getElementById('bookTitle')
const author = document.getElementById('bookAuthor')
const pages = document.getElementById('bookPages')
const form = document.getElementById('form')



let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.sayInfo = function() {
        info = String(`${title} by ${author}, ${pages}, ${status}`)
        return info
    }
}

function addBookToLibrary() {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        checkInputs();
        $(e).unbind('submit').submit()
    })
    const TheHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read')
}

addBookToLibrary();