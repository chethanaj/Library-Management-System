package lk.chethana.lendservice.model;


import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Data
public class BookReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date creationDate;
    private Integer customerId;
    private Integer bookId;
    private String isbn;
    private Boolean isReserved;

}
