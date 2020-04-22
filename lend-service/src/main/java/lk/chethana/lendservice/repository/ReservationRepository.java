package lk.chethana.lendservice.repository;


import lk.chethana.lendservice.model.BookReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<BookReservation,Integer> {

    List<BookReservation> findByCustomerId(Integer customerId);

    List<BookReservation> findByCustomerIdAndIsReserved(Integer customerId, Boolean reserved);

}
