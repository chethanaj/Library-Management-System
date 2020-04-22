package lk.chethana.lendservice.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Data
public class Book {

    private Integer id;
    private String isbn;
    private String title;
    private String subject;
    private String publisher;
    private String language;
    private Integer noOfPages;
    private BookStatus status;

}
