package lk.chethana.apigateway.service;


import lk.chethana.apigateway.model.Customer;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CustomerService {

    private final RestTemplate restTemplate;

    public CustomerService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Customer saveCustomer(Customer customer,String token){

        HttpHeaders headers=new HttpHeaders();
        headers.add("Authorization","Bearer " + token);
        HttpEntity<Customer> request = new HttpEntity<>(customer,headers);

        ResponseEntity<Customer> response = restTemplate
                .exchange("http://localhost:8081/customer-api/customer", HttpMethod.POST, request, Customer.class);

        //assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
        return response.getBody();

    }

    public Customer getCustomerById(int id,String token){

        HttpHeaders headers=new HttpHeaders();
        headers.add("Authorization","Bearer " + token);
        HttpEntity<Customer> request = new HttpEntity<>(headers);

        ResponseEntity<Customer> response = restTemplate
                .exchange("http://localhost:8081/customer-api/customer/"+id, HttpMethod.GET, request, Customer.class);

        //assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
        return response.getBody();

    }
}
