package lk.chethana.customerservice.repository;

import lk.chethana.customerservice.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Integer> {

    Customer findByEmail(String email);
}
