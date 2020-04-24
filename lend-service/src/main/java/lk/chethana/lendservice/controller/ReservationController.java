package lk.chethana.lendservice.controller;


import lk.chethana.lendservice.model.BookReservation;
import lk.chethana.lendservice.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reserve")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @PreAuthorize("hasRole('ROLE_LIBUSER')")
    @RequestMapping(method = RequestMethod.POST)
    public BookReservation reserve(@RequestBody BookReservation bookReservation) {

        Date date=Date.valueOf(LocalDate.now());
        bookReservation.setCreationDate(date);
        bookReservation.setIsReserved(true);
        BookReservation reservation = reservationService.save(bookReservation);

        return reservation;
    }

    @PreAuthorize("hasRole('ROLE_LIBUSER')")
    @RequestMapping(value = "/cancel/{id}", method = RequestMethod.POST)
    public BookReservation cancel(@PathVariable Integer id) {

        BookReservation reservation = reservationService.findOne(id);
        reservation.setIsReserved(false);
        return reservationService.save(reservation);
    }

    @PreAuthorize("hasRole('ROLE_LIBUSER')")
    @RequestMapping(method = RequestMethod.GET)
    public List<BookReservation> findAll() {
        return reservationService.fetchAllReservingBooks();
    }

    @PreAuthorize("hasRole('ROLE_LIBUSER')")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public List<BookReservation> getReservingByCustomerId(@PathVariable Integer id) {
        return reservationService.getReservingByCustomerId(id);
    }
}
