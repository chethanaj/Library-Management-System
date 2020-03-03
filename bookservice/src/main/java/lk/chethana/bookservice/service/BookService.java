package lk.chethana.bookservice.service;

import lk.chethana.bookservice.model.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {

    Book addBook(Book book);
    void deleteBook(Integer id);
    List<Book> getAllBooks();
    Optional <Book> findById(Integer bookId);

}
