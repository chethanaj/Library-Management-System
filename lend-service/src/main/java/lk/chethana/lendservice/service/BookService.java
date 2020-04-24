package lk.chethana.lendservice.service;

import lk.chethana.lendservice.model.Book;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class BookService {

    private final RestTemplate restTemplate;

    public BookService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Book updateBook(Book book, String token){

        HttpHeaders headers=new HttpHeaders();
        headers.add("Authorization","Bearer " + token);
        HttpEntity<Book> request = new HttpEntity<>(book,headers);

        ResponseEntity<Book> response = restTemplate
                .exchange("http://localhost:8081/book-api/book/updateStatus/" + book.getId(), HttpMethod.POST, request, Book.class);

        //assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
        return response.getBody();

    }
}
