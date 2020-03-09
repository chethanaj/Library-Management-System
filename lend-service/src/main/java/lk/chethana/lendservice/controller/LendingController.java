package lk.chethana.lendservice.controller;


import lk.chethana.lendservice.model.BookLending;
import lk.chethana.lendservice.service.LendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lend")
public class LendingController {

    @Autowired
    LendingService lendingService;

    @RequestMapping(method = RequestMethod.POST)
    public BookLending save(@RequestBody BookLending bookLending) {

        return lendingService.save(bookLending);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<BookLending> findAll() {
        return lendingService.fetchAllLendingBooks();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public List<BookLending> getLendingByCustomerId(@PathVariable Integer id) {
        return lendingService.getLendingByCustomerId(id);
    }
}
