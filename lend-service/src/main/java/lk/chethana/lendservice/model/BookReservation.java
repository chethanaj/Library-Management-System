package lk.chethana.lendservice.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
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
