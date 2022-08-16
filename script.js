// Get DOM elements
const defaultBook = new Book("Book Title Goes Here", "Author", 100, true);

const container = document.querySelector('.container');

const mainGrid = container.querySelector('.main-grid');

const addBookButton = mainGrid.querySelector('button.add-book');

addBookButton.textContent = 'Add New Book';

addBookButton.addEventListener('click', function() {
    addBookToLibrary(defaultBook.name, defaultBook.author, 
        defaultBook.pages, defaultBook.read);
    
    updateLibraryDisplay();
});

/**
 * Current library of books.
 */
let myLibrary = [];

/**
 * Book constructor.
 * @param {String} name Book's name
 * @param {String} author Book's author
 * @param {Number} pages Number of pages
 * @param {Boolean} read Is read
 */
function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

/**
 * Returns information about the book.
 * @returns {String} Book information
 */
Book.prototype.info = function() {
    const isRead = this.read ? 'is read' : 'not read yet';
    return `${this.name} by ${this.author}, ${this.pages} pages, ${isRead}.`
}

/**
 * Adds a new Book to the library.
 * @see {@link myLibrary}
 * @param {String} name Book's name
 * @param {String} author Book's author
 * @param {Number} pages Number of pages
 * @param {Boolean} read Is read
 */
function addBookToLibrary(name, author, pages, read) {
    myLibrary.push(new Book(name, author, pages, read));
}

function createCard(book) {
    const card = document.createElement('div');
    card.classList.add('card');

    const sideColor = document.createElement('div');
    sideColor.classList.add('side-color');
    card.appendChild(sideColor);

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('title');
    cardTitle.textContent = book.name;
    card.appendChild(cardTitle);

    const content = document.createElement('div');
    content.classList.add('content');
    content.textContent = book.info();
    card.appendChild(content);

    const actions = document.createElement('div');
    actions.classList.add('actions');
    card.appendChild(actions);

    return card;
}

function updateLibraryDisplay() {
    // Empty grid
    const gridBooks = [...mainGrid.children];
    gridBooks.slice(1, gridBooks.length).forEach(child => {
        mainGrid.removeChild(child);
    });

    // Add children from library
    myLibrary.forEach(book => {
        mainGrid.appendChild(createCard(book));
    });
}

/**
// To be deleted

const nBooks = 6;
for (let i = 1; i < nBooks; i++) {
    myLibrary.push(defaultBook);

}

updateLibraryDisplay();
*/
