package lk.chethana.customerservice.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Integer contactNumber;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;


    @Transient
    private List<BookLending> bookLendings = new ArrayList<>();

    @Transient
    private List<BookReservation> bookReservations = new ArrayList<>();

    @Transient
    private List<Fine> fines = new ArrayList<>();
}
