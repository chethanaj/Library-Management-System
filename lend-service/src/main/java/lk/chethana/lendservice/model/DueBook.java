package lk.chethana.lendservice.model;

import lombok.Data;

import java.sql.Date;

@Data
public class DueBook {

    Integer userId;
    Integer bookId;
    String isbn;
    Date issueDate;
    Date expectedReturnDate;
    int lateDates;
    int fine;

}
