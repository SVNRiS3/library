const myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function () {
		return `${title} by ${author}, ${pages} pages, ${
			read ? "read" : "not read yet"
		}`;
	};
}

function addBookToLibrary() {
	let title = prompt("Please enter book's title: ");
	let author = prompt("Please enter book's author: ");
	let pages = parseInt(prompt("Please enter book's pages: "));
	let read = null;
	while (!"yn".includes(read)) {
		read = prompt("Have you read the book? (y/n)").toLowerCase();
	}
	const newBook = new Book(
		title,
		author,
		pages,
		read === "y" ? true : false
	);
	myLibrary.push(newBook);
	return myLibrary;
}

const theHobbit = new Book(
	"The Hobbit",
	"J.R.R. Tolkien",
	"295",
	false
);

console.log(theHobbit.info());
