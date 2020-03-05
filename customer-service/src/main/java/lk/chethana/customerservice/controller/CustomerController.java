package lk.chethana.customerservice.controller;

import lk.chethana.customerservice.model.Customer;
import lk.chethana.customerservice.service.CustomerService;
import lk.chethana.customerservice.validator.CustomerValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/customer")
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @Autowired
    CustomerValidator customerValidator;

    @RequestMapping(method = RequestMethod.POST)
    public String addCustomer(@RequestBody Customer customer, BindingResult bindingResult) {
        customerValidator.validate(customer,bindingResult);
        if (bindingResult.hasErrors()) {
           return "Password is wrong";
        }else {
            customerService.save(customer);
        }
        return "Success";

    }
}
