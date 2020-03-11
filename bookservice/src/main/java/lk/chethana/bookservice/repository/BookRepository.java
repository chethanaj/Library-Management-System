package lk.chethana.bookservice.repository;


import lk.chethana.bookservice.model.Book;
import lk.chethana.bookservice.model.BookStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Integer> {
    List<Book> findByStatus(BookStatus status);

}
