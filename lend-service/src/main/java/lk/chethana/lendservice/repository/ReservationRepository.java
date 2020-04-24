package lk.chethana.lendservice.repository;


import lk.chethana.lendservice.model.BookReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<BookReservation,Integer> {

    List<BookReservation> findByCustomerId(Integer customerId);

    List<BookReservation> findByIsReserved(Boolean reserved);

    Optional<BookReservation> findById(Integer id);

    List<BookReservation> findByCustomerIdAndIsReserved(Integer customerId,Boolean isReserved);


}
