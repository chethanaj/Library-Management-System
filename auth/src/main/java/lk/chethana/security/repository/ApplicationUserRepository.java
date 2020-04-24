package lk.chethana.security.repository;

import lk.chethana.security.entity.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Integer> {
    ApplicationUser findByUsername(String username);
    ApplicationUser findAllByUsernameAndPassword(String username, String password);
}
