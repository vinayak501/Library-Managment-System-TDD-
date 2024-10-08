class Book {
  constructor(isbn, title, author, year) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.year = year;
    this.isAvailable = true;
    this.willBeAvailableAt = undefined;
  }
}

class Library {
  constructor() {
    this.books = [];
  }
  addBook(isbn, title, author, year) {
    if(!isbn || !title || !author || !year){
        throw new Error("Book details are incomplete");
    }
    const Existingbook = this.books.find((b)=> b.isbn === isbn)
    if(Existingbook){
        throw new Error("Book with this ISBN already exists");
    }
    const book = new Book(isbn, title, author, year);
    this.books.push(book);
    return "Book Added";
  }

  borrowBook(isbn, date) {
    const book = this.books.find((b) => b.isbn === isbn);
    if (!book) {
      throw new Error("Book Not Available in Library");
    }
    if (!book.isAvailable) {
      throw new Error(
        `Book is not Available Yet ,It will be Available after ${book.willBeAvailableAt}`
      );
    }
    if (new Date(date) <= new Date()) {
      throw new Error("Return date must be in the future");
    }
    book.isAvailable = false;
    book.willBeAvailableAt = date;
    return book;
  }

  returnBook(isbn) {
    const book = this.books.find((b) => b.isbn === isbn);
    if (!book) {
      throw new Error("Book don't Belong to Library");
    }
    if (book.isAvailable) {
      throw new Error("This book was not borrowed");
    }
    book.isAvailable = true;
    book.willBeAvailableAt = undefined;
    return "Returned Succesfully";
  }

  viewBooks() {
    const availableBooks = this.books
      .filter((book) => book.isAvailable)
      .map((book) => book.title);
    return availableBooks;
  }
}


export default Library;
