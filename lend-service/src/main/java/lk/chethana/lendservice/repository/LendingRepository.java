package lk.chethana.lendservice.repository;

import lk.chethana.lendservice.model.BookLending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LendingRepository extends JpaRepository<BookLending,Integer> {

    List<BookLending> findByCustomerId(Integer customerId);
}
