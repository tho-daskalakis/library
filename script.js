// Get DOM elements

const formOverlay = document.querySelector('.add-book-overlay');
formOverlay.style.display = 'none';

const form = formOverlay.querySelector('form');

const container = document.querySelector('.container');

const mainGrid = container.querySelector('.main-grid');

const addBookButton = mainGrid.querySelector('button.add-book');

addBookButton.textContent = 'Add New Book';

addBookButton.addEventListener('click', (e) => {
    setFormDisplay('flex');
});

// Get form elements

const titleField = formOverlay.querySelector('#title');
const authorField = formOverlay.querySelector('#author');
const pagesField = formOverlay.querySelector('#pages');
const readField = formOverlay.querySelector('#read');

const confirmFormBtn = document.querySelector('.confirm-form-btn');

confirmFormBtn.addEventListener('click', (e) => {
    addBookToLibrary(
    titleField.value,
    authorField.value,
    pagesField.value,
    readField.value
    );

    setFormDisplay('none');
    form.reset();
});

const cancelFormBtn = document.querySelector('.cancel-form-btn');

cancelFormBtn.addEventListener('click', (e) => {
    setFormDisplay('none');
    form.reset();
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

    updateLibraryDisplay();
}

/**
 * 
 * @param {Book} book The book to be put in the card
 * @returns A card element containing book information
 */
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

/**
 * Updates app interface with current books. 
 * Should be called after every change in the library.
 * @see {@link myLibrary}
 */
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

    console.log(myLibrary);
}

function setFormDisplay(d) {
    formOverlay.style.display = d;
}

// Add a default book to be displayed

const defaultBook = new Book("Do Androids Dream of Electric Sheep?", 
"Philip K. Dick", 210, true);

addBookToLibrary(defaultBook.name, defaultBook.author, defaultBook.pages, 
defaultBook.read);

updateLibraryDisplay();
