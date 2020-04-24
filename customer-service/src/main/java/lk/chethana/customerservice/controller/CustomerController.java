package lk.chethana.customerservice.controller;

import lk.chethana.customerservice.model.Customer;
import lk.chethana.customerservice.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/customer")
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @PreAuthorize("hasRole('ROLE_LIBUSER')")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Customer getCustomerById(@PathVariable Integer id) {

        return customerService.getCustomerById(id);
    }

    @PreAuthorize("hasRole('ROLE_LIBADMIN')")
    @RequestMapping(method = RequestMethod.GET)
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PreAuthorize("hasRole('ROLE_LIBUSER')")
    @RequestMapping(method = RequestMethod.POST)
    public Customer saveCustomer(@RequestBody Customer customer){
                return customerService.saveCustomer(customer);

    }

    @PreAuthorize("hasRole('ROLE_LIBADMIN')")
    @RequestMapping(value = "/getByMail/{email}",method = RequestMethod.GET)
    public Customer getCustomerByEmail(@PathVariable String email) {
        return customerService.getCustomerByEmail(email);
    }




}
