package lk.chethana.apigateway.controller;

import lk.chethana.apigateway.dto.UserDTO;
import lk.chethana.apigateway.model.AuthResponse;
import lk.chethana.apigateway.model.Customer;
import lk.chethana.apigateway.service.CustomerService;
import lk.chethana.security.DTO.LoginRequest;
import lk.chethana.security.entity.ApplicationUser;
import lk.chethana.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import static lk.chethana.security.SecurityConstants.TOKEN_PREFIX;

@Controller
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService detailsService;

    @Autowired
    private CustomerService customerService;

    @CrossOrigin("*")
    @PostMapping("/signin")
    @ResponseBody
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {

        String token = userService.login(loginRequest);
        HttpHeaders headers = new HttpHeaders();
        List<String> headerlist = new ArrayList<>();
        List<String> exposeList = new ArrayList<>();
        headerlist.add("Content-Type");
        headerlist.add(" Accept");
        headerlist.add("X-Requested-With");
        headerlist.add("Authorization");
        headers.setAccessControlAllowHeaders(headerlist);
        exposeList.add("Authorization");
        headers.setAccessControlExposeHeaders(exposeList);
        headers.set("Authorization", token);

        ApplicationUser user = userService.getUserByUsername(loginRequest.getUsername());
        AuthResponse authResponse = new AuthResponse(token);
        authResponse.setUserId(user.getId());
        authResponse.setUserName(user.getUsername());

        authResponse.setUserRoles(user.getRoles().stream().map(a -> a.getName().toString()).collect(Collectors.toList()));
        return new ResponseEntity<>(authResponse, headers, HttpStatus.CREATED);
    }

//    @CrossOrigin("*")
//    @PostMapping("/signout")
//    @ResponseBody
//    public ResponseEntity<AuthResponse> logout(@RequestHeader(value = "Authorization") String token) {
//        HttpHeaders headers = new HttpHeaders();
//        if (loginService.logout(token)) {
//            headers.remove("Authorization");
//            return new ResponseEntity<AuthResponse>(new AuthResponse("logged out"), headers, HttpStatus.CREATED);
//        }
//        return new ResponseEntity<AuthResponse>(new AuthResponse("Logout Failed"), headers, HttpStatus.NOT_MODIFIED);
//    }

    /**
     * @param token
     * @return boolean.
     * if request reach here it means it is a valid token.
     */
    @PostMapping("/valid/token")
    @ResponseBody
    public Boolean isValidToken(@RequestHeader(value = "Authorization") String token) {
        return true;
    }


    @PostMapping("/valid/admin")
    @ResponseBody
    public Boolean isAdmin(@RequestBody String username) {

        UserDetails details = detailsService.loadUserByUsername(username);

        for (GrantedAuthority g : details.getAuthorities()) {
            if (g.getAuthority().equalsIgnoreCase("ROLE_LIBADMIN"))
                return true;
        }
        return false;
    }


//    @PostMapping("/signin/token")
//    @CrossOrigin("*")
//    @ResponseBody
//    public ResponseEntity<AuthResponse> createNewToken(@RequestHeader(value = "Authorization") String token) {
//        String newToken = loginService.createNewToken(token);
//        HttpHeaders headers = new HttpHeaders();
//        List<String> headerList = new ArrayList<>();
//        List<String> exposeList = new ArrayList<>();
//        headerList.add("Content-Type");
//        headerList.add(" Accept");
//        headerList.add("X-Requested-With");
//        headerList.add("Authorization");
//        headers.setAccessControlAllowHeaders(headerList);
//        exposeList.add("Authorization");
//        headers.setAccessControlExposeHeaders(exposeList);
//        headers.set("Authorization", newToken);
//        return new ResponseEntity<>(new AuthResponse(newToken), headers, HttpStatus.CREATED);
//    }

    @PostMapping("/register")
    @CrossOrigin("*")
    @ResponseBody
    public ResponseEntity<AuthResponse> createNewUser(@RequestBody UserDTO user) {
        String pwd = user.getPassword();
        ApplicationUser applicationUser = new ApplicationUser();
        applicationUser.setUsername(user.getUsername());
        applicationUser.setPassword(user.getPassword());
        applicationUser.setRoles(user.getRoles());
        applicationUser = userService.signUp(applicationUser);

        Customer customer = new Customer();
        customer.setFirstName(user.getFirstName());
        customer.setLastName(user.getLastName());
        customer.setContactNumber(user.getContactNumber());
        customer.setEmail(user.getUsername());
        customer.setAddress(user.getAddress());


        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(user.getUsername());
        loginRequest.setPassword(user.getPassword());

        String token = userService.login(loginRequest);
        customerService.saveCustomer(customer, TOKEN_PREFIX + token);

        HttpHeaders headers = new HttpHeaders();
        List<String> headerList = new ArrayList<>();
        List<String> exposeList = new ArrayList<>();
        headerList.add("Content-Type");
        headerList.add(" Accept");
        headerList.add("X-Requested-With");
        headerList.add("Authorization");
        headers.setAccessControlAllowHeaders(headerList);
        exposeList.add("Authorization");
        headers.setAccessControlExposeHeaders(exposeList);
        headers.set("Authorization", token);
        return new ResponseEntity<>(new AuthResponse(token), headers, HttpStatus.CREATED);
    }
}
