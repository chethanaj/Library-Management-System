package lk.chethana.lendservice.service;


import lk.chethana.lendservice.model.BookReservation;
import lk.chethana.lendservice.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService{

    @Autowired
    ReservationRepository reservationRepository;

    @Override
    public BookReservation save(BookReservation bookReservation) {
        return reservationRepository.save(bookReservation);
    }

    @Override
    public List<BookReservation> fetchAllReservingBooks() {
        return reservationRepository.findAll();
    }

    @Override
    public List<BookReservation> getReservingByCustomerId(Integer id) {
        return reservationRepository.findByCustomerId(id);
    }

    @Override
    public BookReservation findOne(Integer id) {
        return reservationRepository.getOne(id);
    }
}
