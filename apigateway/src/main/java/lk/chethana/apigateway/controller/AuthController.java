package lk.chethana.apigateway.controller;

import lk.chethana.apigateway.dto.UserDTO;
import lk.chethana.apigateway.model.AuthResponse;
import lk.chethana.apigateway.model.Customer;
import lk.chethana.apigateway.service.CustomerService;
import lk.chethana.security.DTO.LoginRequest;
import lk.chethana.security.entity.ApplicationUser;
import lk.chethana.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

import static lk.chethana.security.SecurityConstants.TOKEN_PREFIX;

@Controller
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

    @CrossOrigin("*")
    @PostMapping("/signin")
    @ResponseBody
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {

        String token = userService.login(loginRequest);
        ApplicationUser user = userService.getUserByUsername(loginRequest.getUsername());
        AuthResponse authResponse = new AuthResponse(token);
        authResponse.setUserId(user.getId());
        authResponse.setUserName(user.getUsername());

        Customer customer = customerService.getCustomerById(user.getId(),token);
        authResponse.setUserLogo(customer.getFirstName()+" "+customer.getLastName());

        authResponse.setUserRoles(user.getRoles().stream().map(a -> a.getName().toString()).collect(Collectors.toList()));
        return new ResponseEntity<>(authResponse, HttpStatus.ACCEPTED);
    }

    @PostMapping("/register")
    @CrossOrigin("*")
    @ResponseBody
    public ResponseEntity<AuthResponse> createNewUser(@RequestBody UserDTO user) {

        ApplicationUser applicationUser = new ApplicationUser();
        applicationUser.setUsername(user.getUsername());
        applicationUser.setPassword(user.getPassword());
        applicationUser.setRoles(user.getRoles());
        applicationUser = userService.signUp(applicationUser);

        Customer customer = new Customer();
        customer.setUserId(applicationUser.getId());
        customer.setFirstName(user.getFirstName());
        customer.setLastName(user.getLastName());
        customer.setContactNumber(user.getContactNumber());
        customer.setEmail(user.getUsername());
        customer.setAddress(user.getAddress());


        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(user.getUsername());
        loginRequest.setPassword(user.getPassword());

        String token = userService.login(loginRequest);
        customer = customerService.saveCustomer(customer, TOKEN_PREFIX + token);


        AuthResponse authResponse = new AuthResponse(token);
        authResponse.setUserId(customer.getId());
        authResponse.setUserName(user.getUsername());
        authResponse.setUserLogo(customer.getFirstName()+" "+customer.getLastName());

        authResponse.setUserRoles(user.getRoles().stream().map(a -> a.getName().toString()).collect(Collectors.toList()));
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }
}
