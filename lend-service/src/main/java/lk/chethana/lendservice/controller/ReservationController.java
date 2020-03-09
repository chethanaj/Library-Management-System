package lk.chethana.lendservice.controller;


import lk.chethana.lendservice.model.BookReservation;
import lk.chethana.lendservice.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reserve")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @RequestMapping(method = RequestMethod.POST)
    public BookReservation save(@RequestBody BookReservation bookReservation) {

        return reservationService.save(bookReservation);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<BookReservation> findAll() {
        return reservationService.fetchAllReservingBooks();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public List<BookReservation> getReservingByCustomerId(@PathVariable Integer id) {
        return reservationService.getReservingByCustomerId(id);
    }
}
