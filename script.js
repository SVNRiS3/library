const myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read ? "read" : "not read yet";
}

Book.prototype.info = function () {
	return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

function addBookToLibrary(title, author, pages, read) {
	const newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
	return myLibrary;
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295", false);
addBookToLibrary("A Man Called Ove", "Fredrik Backman", "337", true);
addBookToLibrary("Brave New World", "Aldous Huxley", "268", true);
addBookToLibrary(
	"The Shadow of the Wind",
	"Carlos Ruiz Zafón",
	"487",
	true
);

const mainContent = document.querySelector(".main");
