package lk.chethana.bookservice.service;

import lk.chethana.bookservice.model.Book;

import java.util.List;

public interface BookService {

    Book add(Book book);
    List<Book> getAllBooks();
    Book findById(Integer bookId);

}
