package lk.chethana.inventoryservice.service;

public class FineServiceImpl implements FineService {

    @Override
    public Integer CalculateFine(Integer customerId,Integer noOfDueDates) {

        int total;
        total=noOfDueDates*5;
        return total;
    }
}
