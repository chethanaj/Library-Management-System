package lk.chethana.customerservice.repository;

import lk.chethana.customerservice.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer,Integer> {

   Customer findByEmail(String email);
   Customer findByUserId(Integer userId);
}
