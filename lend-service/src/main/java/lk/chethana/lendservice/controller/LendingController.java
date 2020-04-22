package lk.chethana.lendservice.controller;


import lk.chethana.lendservice.model.Book;
import lk.chethana.lendservice.model.BookLending;
import lk.chethana.lendservice.model.BookStatus;
import lk.chethana.lendservice.model.DueBook;
import lk.chethana.lendservice.service.BookService;
import lk.chethana.lendservice.service.LendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.util.Calendar;
import java.util.List;
import java.sql.Date;


@RestController
@RequestMapping("/lend")
public class LendingController {

    @Autowired
    LendingService lendingService;

    @Autowired
    BookService bookService;
//    @RequestMapping(method = RequestMethod.POST)
//    public BookLending save(@RequestBody BookLending bookLending) {
//
//        return lendingService.save(bookLending);
//    }

    public static Date addDays(Date date, int days) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DATE, days);
        return new Date(c.getTimeInMillis());
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<BookLending> findAll() {

        return lendingService.fetchAllLendingBooks();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public List<BookLending> getLendingByCustomerId(@PathVariable Integer id) {
        return lendingService.getLendingByCustomerId(id);
    }

    @RequestMapping(value = "/dueBook/{id}", method = RequestMethod.GET)
    public List<DueBook> getDueBookByCustomerId(@PathVariable Integer id) {
        return lendingService.getDueBookListByCustomerId(id);
    }

    @RequestMapping(value = "/allDueBooks", method = RequestMethod.GET)
    public List<DueBook> getAllDueBook() {
        return lendingService.getDueBookList();
    }

    @RequestMapping(method = RequestMethod.POST)
    public BookLending issueBook(@RequestBody BookLending bookDetails, @RequestHeader("Authorization") String authorization) {

        BookLending bookLending = new BookLending();
        bookLending.setBookId(bookDetails.getBookId());
        bookLending.setCustomerId(bookDetails.getCustomerId());
        bookLending.setIsbn(bookDetails.getIsbn());
        Date date = Date.valueOf(LocalDate.now());
        Date returnDate = addDays(date, 10);
        bookLending.setCreationDate(date);
        bookLending.setReturnDate(returnDate);
        bookLending.setReturned(false);

        bookLending = lendingService.save(bookLending);

        Book book = new Book();
        book.setId(bookDetails.getBookId());
        book.setStatus(BookStatus.LOANED);

        bookService.updateBook(book, authorization);

        return bookLending;
    }

    @RequestMapping(value = "/return/{id}", method = RequestMethod.POST)
    public BookLending returnBook(@PathVariable Integer id, @RequestHeader("Authorization") String authorization) {

        BookLending bookLending = lendingService.findByBookId(id);
        bookLending.setReturned(true);
        bookLending = lendingService.save(bookLending);
        Book book = new Book();
        //book.setId(bookLending.getBookId());
        book.setId(id);
        book.setStatus(BookStatus.AVAILABLE);

        bookService.updateBook(book, authorization);

        return bookLending;
    }

}
