import {it,test,describe,expect, beforeEach} from 'vitest';
import Library from './index';

describe('Library Managment Sytem',()=>{
    let library;
    beforeEach(() => {
      library = new Library();
    });
    it("should add book whenever we run addBook", () => {
      expect(library.addBook("1234", "Ikigai", "Japan", 2012)).toEqual(
        "Book Added"
      );
      expect(library.books).toHaveLength(1);
    });
    it("should remove book if we run borrow or raise an error if book is not available", () => {
      library.addBook("1234", "Ikigai", "Japan", 2012);
      const b = library.borrowBook("1234");
      expect(b.title).toEqual("Ikigai");
      expect(library.books[0].isAvailable).toEqual(false);
    });
    it("should inform about the availability of book in future", () => {
      library.addBook("1234", "Ikigai", "Japan", 2012);
      library.borrowBook("1234", "31/8/2024");
      expect(() => library.borrowBook("1234", "25/9/2024")).toThrow(
        "Book is not Available Yet ,It will be Available after 31/8/2024"
      );
    });
    it("should return the book of user and change availibility accoedingly", () => {
      library.addBook("1234", "Ikigai", "Japan", 2012);
      library.borrowBook("1234", "31/8/2024");
      expect(library.returnBook("1234")).toEqual("Returned Succesfully");
      expect(library.books[0].isAvailable).toEqual(true);
      expect(library.books[0].willBeAvailableAt).toEqual(undefined);
    });
    it("should raise an error if someone is returning book that doesn't belong to library", () => {
      library.addBook("1234", "Ikigai", "Japan", 2012);
      library.borrowBook("1234", "31/8/2024");
      expect(() => library.returnBook("1245")).toThrow(
        "Book don't Belong to Library"
      );
    });
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
})