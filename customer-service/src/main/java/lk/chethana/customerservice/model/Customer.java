package lk.chethana.customerservice.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private Integer contactNumber;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @Transient
    private String passwordConfirm;
}
