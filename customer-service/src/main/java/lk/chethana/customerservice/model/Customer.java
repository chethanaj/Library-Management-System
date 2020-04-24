package lk.chethana.customerservice.model;

import lombok.Data;

import javax.persistence.*;


@Entity
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer userId;
    private String firstName;
    private String lastName;
    private String email;
    private Integer contactNumber;
    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private Address address;

}
