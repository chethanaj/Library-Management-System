package lk.chethana.lendservice.service;


import lk.chethana.lendservice.model.BookLending;
import lk.chethana.lendservice.model.DueBook;
import org.springframework.stereotype.Service;

import java.util.List;


public interface LendingService {

    BookLending save(BookLending bookLending);

    List<BookLending> fetchAllLendingBooks();

    List<BookLending> getLendingByCustomerId(Integer id);

    List<DueBook> getDueBookListByCustomerId(Integer id);
    List<DueBook> getDueBookList();

    BookLending findOne(Integer id);
    BookLending findByBookId(Integer bookId);
}
