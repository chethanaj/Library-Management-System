package lk.chethana.security.repository;

import lk.chethana.security.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationUserRoleRepository extends JpaRepository<Role, Long> {

}
