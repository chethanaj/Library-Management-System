package lk.chethana.bookservice.controller;

import lk.chethana.bookservice.model.Book;
import lk.chethana.bookservice.service.BookServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    BookServiceImpl bookService;

    @RequestMapping(method = RequestMethod.POST)
    public Book addBook(@RequestBody Book book) {

        return bookService.addBook(book);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Book> getBookById(@PathVariable Integer id) {
        return bookService.findById(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Book updateBook(@PathVariable Integer id, @RequestBody Book bookDetails) {
        Optional<Book> book = bookService.findById(id);
        Book updatedBook = null;
        if (book.isPresent()) {
            Book newBook = book.get();
            if (bookDetails.getIsbn() != null)
                newBook.setIsbn(bookDetails.getIsbn());
            if(bookDetails.getTitle()!=null)
                newBook.setTitle(bookDetails.getTitle());
            if(bookDetails.getSubject()!=null)
                newBook.setSubject(bookDetails.getSubject());
            if(bookDetails.getPublisher()!=null)
                newBook.setPublisher(bookDetails.getPublisher());
            if(bookDetails.getLanguage()!=null)
                newBook.setLanguage(bookDetails.getLanguage());
            if(bookDetails.getNoOfPages()!=null)
                newBook.setNoOfPages(bookDetails.getNoOfPages());
            if(bookDetails.getAuthors()!=null)
                newBook.setAuthors(bookDetails.getAuthors());
            updatedBook = bookService.addBook(newBook);
        } else {
            System.out.println("This book doesn't exist");
        }

        return updatedBook;

    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteBookById(@PathVariable Integer id) {
        bookService.deleteBook(id);
    }
}
