package lk.chethana.apigateway.service;


import lk.chethana.apigateway.model.Customer;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CustomerService {

//    @Autowired
//    RestTemplate restTemplate;
//
//    @Autowired
//    HttpHeaders httpHeaders;

    public Customer saveCustomer(Customer customer,String token){

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers=new HttpHeaders();
        headers.add("Authorization",token);
        HttpEntity<Customer> request = new HttpEntity<>(customer,headers);

        ResponseEntity<Customer> response = restTemplate
                .exchange("http://localhost:8081/customer-api/customer", HttpMethod.POST, request, Customer.class);

        //assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
        return response.getBody();

    }
}
