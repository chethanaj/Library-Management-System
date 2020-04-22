package lk.chethana.lendservice.repository;

import lk.chethana.lendservice.model.BookLending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface LendingRepository extends JpaRepository<BookLending,Integer> {

    List<BookLending> findByCustomerId(Integer customerId);
    BookLending findByBookId(Integer bookId);

    List<BookLending> findAllByCustomerIdAndReturned(Integer customerId, Boolean returned);
    List<BookLending> findAllByReturned(Boolean returned);
    List<BookLending> findAllByReturnedAndReturnDateIsBefore(Boolean returned, Date date);

}
