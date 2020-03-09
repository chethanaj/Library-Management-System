package lk.chethana.apigateway.repo;

import lk.chethana.apigateway.model.JwtToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtTokenRepository extends CrudRepository<JwtToken,String> {
}
