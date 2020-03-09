package lk.chethana.lendservice.service;

import lk.chethana.lendservice.model.BookLending;
import lk.chethana.lendservice.repository.LendingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LendingServiceImpl implements LendingService {

    @Autowired
    LendingRepository lendingRepository;

    @Override
    public BookLending save(BookLending bookLending) {
        return lendingRepository.save(bookLending);
    }

    @Override
    public List<BookLending> fetchAllLendingBooks() {
        return lendingRepository.findAll();
    }

    @Override
    public List<BookLending> getLendingByCustomerId(Integer id) {
        return lendingRepository.findByCustomerId(id);
    }
}
