package lk.chethana.customerservice.service;

import lk.chethana.customerservice.model.Customer;

import java.util.Optional;

public interface CustomerService {

    Optional<Customer> getCustomerById(Integer id);

}
