package lk.chethana.bookservice.controller;

import lk.chethana.bookservice.model.Book;
import lk.chethana.bookservice.model.SearchCriteria;
import lk.chethana.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    BookService bookService;

    @PreAuthorize("hasRole('ROLE_LIBADMIN')")
    @RequestMapping(method = RequestMethod.POST)
    public Book addBook(@RequestBody Book book) {

        return bookService.addBook(book);
    }

    @PreAuthorize("hasRole('ROLE_LIBADMIN')")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Book> getBookById(@PathVariable Integer id) {
        return bookService.findById(id);
    }

    @PreAuthorize("hasRole('ROLE_LIBADMIN')")
    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public Book updateBook(@PathVariable Integer id, @RequestBody Book bookDetails) {
        Optional<Book> book = bookService.findById(id);
        Book updatedBook = bookDetails;
        if (book.isPresent()) {
            Book newBook = book.get();
            if (bookDetails.getIsbn() != null)
                newBook.setIsbn(bookDetails.getIsbn());
            if(bookDetails.getTitle()!=null)
                newBook.setTitle(bookDetails.getTitle());
            if(bookDetails.getStatus()!=null)
                newBook.setStatus(bookDetails.getStatus());
            if(bookDetails.getSubject()!=null)
                newBook.setSubject(bookDetails.getSubject());
            if(bookDetails.getPublisher()!=null)
                newBook.setPublisher(bookDetails.getPublisher());
            if(bookDetails.getLanguage()!=null)
                newBook.setLanguage(bookDetails.getLanguage());
            if(bookDetails.getNoOfPages()!=null)
                newBook.setNoOfPages(bookDetails.getNoOfPages());
            if(bookDetails.getAuthors()!=null && !bookDetails.getAuthors().isEmpty())
                newBook.setAuthors(bookDetails.getAuthors());
            updatedBook = bookService.addBook(newBook);
        } else {
            System.out.println("This book doesn't exist");
        }

        return updatedBook;

    }

    @PreAuthorize("hasRole('ROLE_LIBUSER')")
    @RequestMapping(method = RequestMethod.GET)
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    //http://192.168.8.100:43267/book/allBooks?search=subject:history
    @PreAuthorize("hasRole('ROLE_LIBUSER')")
    @RequestMapping(method = RequestMethod.GET, value = "/allBooks")
    @ResponseBody
    public List<Book> findAll(@RequestParam(value = "search", required = false) String search) {
        List<SearchCriteria> params = new ArrayList<>();
        if (search != null) {
            Pattern pattern = Pattern.compile("(\\w+?)(:|<|>)(\\w+?),");
            Matcher matcher = pattern.matcher(search + ",");
            while (matcher.find()) {
                params.add(new SearchCriteria(matcher.group(1),
                        matcher.group(2), matcher.group(3)));
            }
        }
        return bookService.search(params);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteBookById(@PathVariable Integer id) {
        bookService.deleteBook(id);
    }



    @RequestMapping(value = "/availableBooks")
    public List<Book> getAvailableBooks(){
        return bookService.getAllAvailableBooks();
    }

    @RequestMapping(value = "/loanedBooks")
    public List<Book> getLoanedBooks(){
        return bookService.getAllLoanedBooks();
    }

    @RequestMapping(value = "/updateStatus/{id}",method = RequestMethod.POST)
    public Book updateBookStatus(@PathVariable Integer id, @RequestBody Book bookDetails){

        Optional<Book> book = bookService.findById(id);
        Book updatedBook;
        Book newBook = book.get();
        newBook.setStatus(bookDetails.getStatus());
        updatedBook = bookService.addBook(newBook);
        return updatedBook;
    }

}
