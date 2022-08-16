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
    const isRead = read ? 'is read' : 'not read yet';
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
