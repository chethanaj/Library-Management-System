package lk.chethana.apigateway.repo;

import lk.chethana.apigateway.model.Role;
import org.springframework.data.repository.CrudRepository;

public interface UserRoleRepository extends CrudRepository<Role,Integer> {

}
