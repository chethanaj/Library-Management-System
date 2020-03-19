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
    public Optional <Customer> getCustomerById(Integer id) {
        return customerRepository.findById(id);
    }

    public Customer findByUsername(String username) {
        return customerRepository.findByEmail(username);
    }

    public List <Customer> getAllCustomers(){return customerRepository.findAll();}

    @Override
    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }
}
