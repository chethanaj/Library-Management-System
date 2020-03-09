package lk.chethana.inventoryservice.service;

import org.springframework.stereotype.Service;

@Service
public interface FineService {

     Integer CalculateFine(Integer customerID,Integer noOfDueDates);
}
