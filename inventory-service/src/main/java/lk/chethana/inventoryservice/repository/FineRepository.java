package lk.chethana.inventoryservice.repository;

import lk.chethana.inventoryservice.model.Fine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FineRepository extends JpaRepository<Fine,Integer> {

}
