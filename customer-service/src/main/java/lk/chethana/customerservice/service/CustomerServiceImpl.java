package lk.chethana.customerservice.service;

import lk.chethana.customerservice.model.Customer;
import lk.chethana.customerservice.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;


    @Override
    public Customer getCustomerById(Integer id) {
        return customerRepository.findByUserId(id);
    }

    public Customer getCustomerByEmail(String email) {

        return customerRepository.findByEmail(email);
    }

    public List <Customer> getAllCustomers(){return customerRepository.findAll();}

    @Override
    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

}
