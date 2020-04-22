package lk.chethana.lendservice.service;

import lk.chethana.lendservice.model.BookLending;
import lk.chethana.lendservice.model.DueBook;
import lk.chethana.lendservice.repository.LendingRepository;
import org.joda.time.DateTime;
import org.joda.time.Days;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class LendingServiceImpl implements LendingService {

    @Autowired
    LendingRepository lendingRepository;

    @Override
    public BookLending save(BookLending bookLending) {
        return lendingRepository.save(bookLending);
    }

    @Override
    public List<BookLending> fetchAllLendingBooks() {


        return lendingRepository.findAllByReturned(false);
    }

    @Override
    public List<BookLending> getLendingByCustomerId(Integer id) {
        return lendingRepository.findByCustomerId(id);
    }

    @Override
    public List<DueBook> getDueBookListByCustomerId(Integer id) {

        List<BookLending> list = lendingRepository.findAllByCustomerIdAndReturned(id, false);
        List<DueBook> dueBooks = new ArrayList<>();
        Date date = Date.valueOf(LocalDate.now());
        for (BookLending bookLending : list) {
            dueBooks.add(getDueBookData(bookLending, date));
        }

        return dueBooks;
    }

    @Override
    public BookLending findOne(Integer id) {
        return lendingRepository.getOne(id);
    }

    @Override
    public BookLending findByBookId(Integer bookId) {
        return lendingRepository.findByBookId(bookId);
    }

    @Override
    public List<DueBook> getDueBookList() {
        List<DueBook> dueBooks = new ArrayList<>();
        Date date = Date.valueOf(LocalDate.now());

        List<BookLending> list = lendingRepository.findAllByReturnedAndReturnDateIsBefore(false, date);
        for (BookLending bookLending : list) {
            dueBooks.add(getDueBookData(bookLending, date));
        }

        return dueBooks;
    }

    private DueBook getDueBookData(BookLending bookLending, Date date) {
        DueBook dueBook = new DueBook();
        dueBook.setUserId(bookLending.getCustomerId());
        dueBook.setExpectedReturnDate(bookLending.getReturnDate());
        dueBook.setIssueDate(bookLending.getCreationDate());
        dueBook.setBookId(bookLending.getBookId());
        dueBook.setIsbn(bookLending.getIsbn());

        Date expectedReturnedDate = bookLending.getReturnDate();

        DateTime from = new DateTime(expectedReturnedDate);
        DateTime to = new DateTime(date);
        Days dueDates = Days.daysBetween(from, to);
        dueBook.setLateDates(dueDates.getDays());
        dueBook.setFine(dueDates.getDays() * 5);
        return dueBook;
    }
}
