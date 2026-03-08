const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read) ? "has been read" : "not read yet"}, ID:${this.id}`;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
    displayBooks();
}

function addBookToLibrary(title, author, pages) {
    myLibrary.push(new Book(title, author, pages, false));
}

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(index, 1);
    displayBooks();
}

function displayBooks() {
    const library = document.querySelector(".library");
    library.innerHTML = "";
    
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.id = book.id;

        const title = document.createElement("h2");
        title.textContent = book.title;

        const author = document.createElement("p")
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p")
        pages.textContent = `Pages: ${book.pages}`;

        const status = document.createElement("p");
        status.textContent = `Status: ${book.read ? "Has been read" : "Not read yet"}`;

        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            removeBook(book.id);
        });
        buttons.append(removeBtn);

        const readBtn = document.createElement("button");
        readBtn.textContent = "Read";
        readBtn.addEventListener("click", () => {
            book.toggleRead();
        });
        buttons.append(readBtn);

        bookCard.append(title, author, pages, status, buttons);
        library.appendChild(bookCard);
    });
}

let book = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
let book2 = new Book("Hatchet", "Gary Paulsen", 192, true);
let book3 = new Book("Bone", "Jeff Smith", 145, true);

myLibrary.push(book, book2, book3);
displayBooks();

const form = document.querySelector("dialog form");

form.addEventListener("submit", function(event) {
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");

    addBookToLibrary(title.value, author.value, pages.value);
    displayBooks();

    title.value = "";
    author.value = "";
    pages.value = "";
});