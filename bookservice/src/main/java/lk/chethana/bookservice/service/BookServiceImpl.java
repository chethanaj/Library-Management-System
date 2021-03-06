package lk.chethana.bookservice.service;

import lk.chethana.bookservice.model.Book;
import lk.chethana.bookservice.model.BookStatus;
import lk.chethana.bookservice.model.SearchCriteria;
import lk.chethana.bookservice.repository.BookRepository;
import lk.chethana.bookservice.repository.BookRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    BookRepository bookRepository;

    @Autowired
    BookRepositoryImpl bookRepositoryImpl;

    @Override
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }


    @Override
    public void deleteBook(Integer id) {
        bookRepository.deleteById(id);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> findById(Integer bookId) {

        return bookRepository.findById(bookId);

    }

    @Override
    public List<Book> search(List<SearchCriteria> params) {
        return bookRepositoryImpl.searchUser(params);
    }

    @Override
    public List<Book> getAllAvailableBooks() {
        return bookRepository.findByStatus(BookStatus.AVAILABLE);
    }

    @Override
    public List<Book> getAllLoanedBooks() {
        return bookRepository.findByStatus(BookStatus.LOANED);
    }
}
