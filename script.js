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

Book.prototype.createElement = function () {
	const element = document.createElement("div");
	element.classList.add("card");

	for (property in this) {
		if (typeof this[property] === "function") continue;

		let propertyElement = document.createElement("div");
		propertyElement.classList.add(property);
		propertyElement.textContent = this[property];
		element.appendChild(propertyElement);
	}
	return element;
};

function addBookToLibrary(title, author, pages, read) {
	const newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
	return newBook;
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

for (book of myLibrary) {
	mainContent.appendChild(book.createElement());
}

//Add "pages" word to book cards
const pages = document.querySelectorAll(".pages");
pages.forEach((page) => (page.textContent += " pages"));

const dialog = document.querySelector(".dialog");
const addBookButton = document.querySelector(".add-book");
const cancelDialog = document.querySelector(".cancel-dialog");
const addBookForm = document.querySelector("dialog form");
const readLabels = document.querySelectorAll(".fieldset label");
const pagesField = document.querySelector("#pages");
const searchBox = document.querySelector("input[type='search'");

//open dialog box after clicking "Add book" button and reset it
addBookButton.addEventListener("click", () => {
	readLabels.forEach((label) => label.classList.remove("active"));
	addBookForm.reset();
	dialog.showModal();
});

//Close dialog without adding a book
cancelDialog.addEventListener("click", (event) => {
	event.preventDefault();
	dialog.close();
	addBookButton.focus();
});

//Implement working read buttons
readLabels.forEach((label) => {
	label.addEventListener("click", (event) => {
		readLabels.forEach((label) => label.classList.remove("active"));
		event.target.classList.add("active");
	});
});

//Limit pages field to numbers only
pagesField.addEventListener("input", (event) => {
	event.target.value = event.target.value.replace(/\D/g, "");
});

//Implement search by title or author feature
searchBox.addEventListener("input", (event) => {
	let searchQuery = "" + event.target.value.toLowerCase();
	mainContent.childNodes.forEach((card) => {
		card.classList.remove("hidden");
		if (
			!(
				card
					.querySelector(".title")
					.textContent.toLowerCase()
					.includes(searchQuery) ||
				card
					.querySelector(".author")
					.textContent.toLowerCase()
					.includes(searchQuery)
			)
		) {
			card.classList.add("hidden");
		}
	});
});

function findValue(objectToSearch, queryToSearch) {
	return objectToSearch.querySelector(queryToSearch).value;
}

addBookForm.addEventListener("submit", (event) => {
	const newBook = addBookToLibrary(
		findValue(addBookForm, "#title"),
		findValue(addBookForm, "#author"),
		findValue(addBookForm, "#pages"),
		+findValue(addBookForm, "[name='readState']:checked")
	);
	mainContent.appendChild(newBook.createElement());
});
