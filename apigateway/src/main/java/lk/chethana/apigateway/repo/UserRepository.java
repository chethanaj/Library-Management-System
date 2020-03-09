package lk.chethana.apigateway.repo;

import lk.chethana.apigateway.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Integer> {

    User findByUsername(String email);
}
