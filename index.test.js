import {it,test,describe,expect, beforeEach} from 'vitest';
import Library from './index';

describe('Library Managment Sytem',()=>{
  let library;

  // beforeEach function of vitest will reInitialize library object before each test case
  beforeEach(() => {
    library = new Library();
  });

  // Test case to check **AddBook** Function
  it("should add book whenever user add Book", () => {
    expect(library.addBook("1234", "Ikigai", "Japan", 2012)).toEqual(
      "Book Added"
    );
    expect(library.books).toHaveLength(1);
  });

  // Test case to check for duplicate books
  it("should not allow duplicate books with the same ISBN", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    expect(() => library.addBook("1234", "Ikigai", "Japan", 2012)).toThrow(
      "Book with this ISBN already exists"
    );
  });

  // Test case to check that a book cannot be added with missing information
  it("should throw an error if any book details are missing", () => {
    expect(() => library.addBook("1234", "Ikigai", "", 2012)).toThrow(
      "Book details are incomplete"
    );
  });

  // Test case to check **BorrowBook** Function whenever it's **Success**
  it("should change availibility of book whenever user borrow book", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    const book = library.borrowBook("1234");
    expect(book.title).toEqual("Ikigai");
    expect(library.books[0].isAvailable).toEqual(false);
  });

  // Test case to Notify User future Availibility of Book from **borrowBook**
  it("should inform about the availability of book in future", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    library.borrowBook("1234", "31/8/2024");
    expect(() => library.borrowBook("1234", "25/9/2024")).toThrow(
      "Book is not Available Yet ,It will be Available after 31/8/2024"
    );
  });

  // Test case to check if a book can be borrowed by multiple users simultaneously
  it("should not allow a book to be borrowed if it's already borrowed", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    library.borrowBook("1234", "31/8/2024");
    expect(() => library.borrowBook("1234", "25/9/2024")).toThrow(
      "Book is not Available Yet ,It will be Available after 31/8/2024"
    );
  });

  // Test case to check the correct book is being borrowed
  it("should borrow the correct book by ISBN", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    library.addBook("1235", "Clean Code", "Robert C. Martin", 2008);
    const borrowedBook = library.borrowBook("1235", "31/8/2024");
    expect(borrowedBook.title).toEqual("Clean Code");
    expect(library.books[1].isAvailable).toEqual(false);
  });

  // Test for borrowing a book with a past date
  it("should throw an error when trying to borrow a book with a past return date", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    expect(() => library.borrowBook("1234", "2023-08-01")).toThrow(
      "Return date must be in the future"
    );
  });

  // Test for returning a book that was not borrowed
  it("should throw an error when trying to return a book that was not borrowed", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    expect(() => library.returnBook("1234")).toThrow(
      "This book was not borrowed"
    );
  });

  // Test case to check **returnBook** Function
  it("should return the book of user and change availibility accoedingly", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    library.borrowBook("1234", "31/8/2024");
    expect(library.returnBook("1234")).toEqual("Returned Succesfully");
    expect(library.books[0].isAvailable).toEqual(true);
    expect(library.books[0].willBeAvailableAt).toEqual(undefined);
  });

  // Test case to check **returnBook** Function Error
  it("should raise an error if someone is returning book that doesn't belong to library", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    library.borrowBook("1234", "31/8/2024");
    expect(() => library.returnBook("1245")).toThrow(
      "Book don't Belong to Library"
    );
  });

  // Test case to ensure returning a book updates its status
  it("should update the book's availability and return date correctly", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    library.borrowBook("1234", "31/8/2024");
    library.returnBook("1234");
    expect(library.books[0].isAvailable).toEqual(true);
    expect(library.books[0].willBeAvailableAt).toEqual(undefined);
  });

  // Test for viewing books when no books are available
  it("should return an empty list when no books are available", () => {
    expect(library.viewBooks()).toEqual([]);
  });

  // Test for viewing books when all books are borrowed
  it("should return an empty list when all books are borrowed", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    library.addBook("1235", "Clean Code", "Bob Martin", 2010);
    library.borrowBook("1234", "2024-09-01");
    library.borrowBook("1235", "2024-09-01");
    expect(library.viewBooks()).toEqual([]);
  });

  // Test Case to check **viewBook** Function
  it("should return all books that are available in the library", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    library.addBook("1235", "saurashtrini rasdhar", "unknown", 2005);
    library.addBook("1236", "the clean code", "bob martin", 2010);
    library.borrowBook("1236", "31/8/2024");
    const availableBooks = library.viewBooks();
    expect(availableBooks).toHaveLength(2);
    expect(availableBooks).toContain("Ikigai");
    expect(availableBooks).toContain("saurashtrini rasdhar");
  });

  // Test case to check if `viewBooks` returns only available books
  it("should only return books that are currently available", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    library.addBook("1235", "The Pragmatic Programmer", "Andrew Hunt", 1999);
    library.borrowBook("1234", "31/8/2024");
    const availableBooks = library.viewBooks();
    expect(availableBooks).not.toContain("Ikigai");
    expect(availableBooks).toContain("The Pragmatic Programmer");
  });

  // Test case to check if `viewBooks` returns an empty list if no books are available
  it("should return an empty list if no books are available", () => {
    library.addBook("1234", "Ikigai", "Japan", 2012);
    library.borrowBook("1234", "31/8/2024");
    const availableBooks = library.viewBooks();
    expect(availableBooks).toHaveLength(0);
  });
})