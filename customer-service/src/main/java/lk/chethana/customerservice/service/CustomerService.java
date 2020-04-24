package lk.chethana.customerservice.service;

import lk.chethana.customerservice.model.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {

    Customer getCustomerById(Integer id);
    Customer getCustomerByEmail(String email);
    List <Customer> getAllCustomers();
    Customer saveCustomer(Customer customer);
}
