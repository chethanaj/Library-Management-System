package lk.chethana.customerservice.controller;

import lk.chethana.customerservice.model.Customer;
import lk.chethana.customerservice.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "/customer")
public class CustomerController {
    @Autowired
    CustomerService customerService;


    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Customer> getCustomerById(@PathVariable Integer id) {
        return customerService.getCustomerById(id);
    }
}
