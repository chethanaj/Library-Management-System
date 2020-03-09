package lk.chethana.customerservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Entity;
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
    private Integer dueDates;
    private Integer bookId;
    private String isbn;

    @JsonIgnore
    private Integer customerId;

}
