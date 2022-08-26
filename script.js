// Get DOM elements

const formOverlay = document.querySelector(".add-book-overlay");
formOverlay.style.display = "none";

const form = formOverlay.querySelector("form");

const container = document.querySelector(".container");

const mainGrid = container.querySelector(".main-grid");

const addBookButton = mainGrid.querySelector("button.add-book");

addBookButton.textContent = "Add New Book";

addBookButton.addEventListener("click", (e) => {
  setFormDisplay("flex");
});

// Get form elements

const titleField = formOverlay.querySelector("#title");
const authorField = formOverlay.querySelector("#author");
const pagesField = formOverlay.querySelector("#pages");
const readField = formOverlay.querySelector("#read");

const confirmFormBtn = document.querySelector(".confirm-form-btn");

confirmFormBtn.addEventListener("click", (e) => {
  addBookToLibrary(
    titleField.value,
    authorField.value,
    pagesField.value,
    readField.checked
  );

  setFormDisplay("none");
  form.reset();
});

const cancelFormBtn = document.querySelector(".cancel-form-btn");

cancelFormBtn.addEventListener("click", (e) => {
  setFormDisplay("none");
  form.reset();
});

let myLibrary = [];

function Book(name, author, pages, read, index) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = index;
}

Book.prototype.info = function () {
  const isRead = this.read ? "is read" : "not read yet";
  return `${this.name} by ${this.author}, ${this.pages} pages, ${isRead}.`;
};

function addBookToLibrary(name, author, pages, read, index = myLibrary.length) {
  myLibrary.push(new Book(name, author, pages, read, index));

  updateLibraryDisplay();
}

function createCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");

  const sideColor = document.createElement("div");
  sideColor.classList.add("side-color");
  card.appendChild(sideColor);

  const cardTitle = document.createElement("div");
  cardTitle.classList.add("title");
  cardTitle.textContent = book.name;
  card.appendChild(cardTitle);

  const content = document.createElement("div");
  content.classList.add("content");
  content.textContent = book.info();
  card.appendChild(content);

  const actions = document.createElement("div");
  actions.classList.add("actions");

  // Card actions
  //

  // Delete

  const actionDelDiv = document.createElement("div");
  actionDelDiv.classList.add("card-action-delete");

  const delBtn = document.createElement("button");
  delBtn.addEventListener("click", (e) => {
    deleteCard(book.index);
  });

  const delImg = document.createElement("img");
  delImg.setAttribute("src", "./svg/delete_FILL0_wght400_GRAD0_opsz48.svg");
  delBtn.appendChild(delImg);

  actionDelDiv.appendChild(delBtn);
  actions.appendChild(actionDelDiv);

  // Toggle read

  const actionReadDiv = document.createElement("div");
  actionReadDiv.classList.add("card-action-read");

  const readBtn = document.createElement("button");
  readBtn.addEventListener("click", (e) => {
    toggleReadStatus(book, readBtn);
  });

  const readImg = document.createElement("img");
  readImg.setAttribute(
    "src",
    "./svg/visibility_FILL0_wght400_GRAD0_opsz48.svg"
  );

  const notReadImg = document.createElement("img");
  notReadImg.setAttribute(
    "src",
    "./svg/visibility_off_FILL0_wght400_GRAD0_opsz48.svg"
  );

  if (book.read) {
    readBtn.appendChild(readImg);
  } else {
    readBtn.appendChild(notReadImg);
  }

  actionReadDiv.appendChild(readBtn);
  actions.appendChild(actionReadDiv);

  card.appendChild(actions);

  return card;
}

function updateLibraryDisplay() {
  // Empty grid
  const gridBooks = [...mainGrid.children];
  gridBooks.slice(1, gridBooks.length).forEach((child) => {
    mainGrid.removeChild(child);
  });

  // Add children from library
  myLibrary.forEach((book) => {
    mainGrid.appendChild(createCard(book));
  });
}

function setFormDisplay(d) {
  formOverlay.style.display = d;
}

function deleteCard(index) {
  console.log(index);
  myLibrary.splice(index, 1);

  // Update indexes

  myLibrary.forEach((book) => (book.index = myLibrary.indexOf(book)));

  updateLibraryDisplay();
}

function toggleReadStatus(book, readBtn) {
  const readImg = document.createElement("img");
  readImg.setAttribute(
    "src",
    "./svg/visibility_FILL0_wght400_GRAD0_opsz48.svg"
  );

  const notReadImg = document.createElement("img");
  notReadImg.setAttribute(
    "src",
    "./svg/visibility_off_FILL0_wght400_GRAD0_opsz48.svg"
  );

  if (book.read) {
    readBtn.childNodes.forEach((child) => readBtn.removeChild(child));
    readBtn.appendChild(notReadImg);
  } else {
    readBtn.childNodes.forEach((child) => readBtn.removeChild(child));
    readBtn.appendChild(readImg);
  }

  book.read = !book.read;

  updateLibraryDisplay();
}

// Add a default book to be displayed

const defaultBook = new Book(
  "Do Androids Dream of Electric Sheep?",
  "Philip K. Dick",
  210,
  true
);

addBookToLibrary(
  defaultBook.name,
  defaultBook.author,
  defaultBook.pages,
  defaultBook.read
);
