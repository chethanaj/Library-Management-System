package lk.chethana.inventoryservice.controller;

import lk.chethana.inventoryservice.service.FineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/fine")
public class FineController {

    @Autowired
    FineService fineService;


    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public Integer getFineByCustomerID(@PathVariable Integer customerId,Integer noOfDueDates) {
        return fineService.CalculateFine(customerId,noOfDueDates);

    }
}
