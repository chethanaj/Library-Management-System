package lk.chethana.apigateway.dto;

import lk.chethana.apigateway.model.Address;
import lk.chethana.security.entity.Role;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {

    private String firstName;
    private String lastName;
    private Integer contactNumber;
    private Address address;
    private String username;
    private String password;
    private List<Role> roles;
}
