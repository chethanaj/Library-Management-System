package lk.chethana.apigateway.model;

import lombok.Data;

@Data
public class Customer {

    private String firstName;
    private String lastName;
    private String email;
    private Integer contactNumber;
    private Address address;
}
