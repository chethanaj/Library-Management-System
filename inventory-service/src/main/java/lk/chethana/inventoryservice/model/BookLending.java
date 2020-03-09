package lk.chethana.inventoryservice.model;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;


@Data
public class BookLending {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date creationDate;
    private Date returnDate;
    private Integer noOfDueDates;
    private Integer customerId;
    private Integer bookId;
    private String isbn;


}
