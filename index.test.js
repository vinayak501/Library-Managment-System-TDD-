import {it,test,describe,expect, beforeEach} from 'vitest';
import Library from './index';

describe('Library Managment Sytem',()=>{
    let library;
    beforeEach(()=>{
        library = new Library();
    })
    it('should add book to books whenever user add a book',()=>{
        expect(library.addBook("1234","Ikigai","Japan",2012)).toEqual("Book Added")
        expect(library.books).toHaveLength(1);
    })
})