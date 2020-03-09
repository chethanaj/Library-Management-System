package lk.chethana.lendservice.service;

import lk.chethana.lendservice.model.BookReservation;

import java.util.List;

public interface ReservationService {

    BookReservation save(BookReservation bookReservation);

    List<BookReservation> fetchAllReservingBooks();

    List<BookReservation> getReservingByCustomerId(Integer id);
}
