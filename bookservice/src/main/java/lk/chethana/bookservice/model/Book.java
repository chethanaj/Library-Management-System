package lk.chethana.bookservice.model;

import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String isbn;
    private String title;
    private String subject;
    private String publisher;
    private String language;
    private Integer noOfPages;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(joinColumns = @JoinColumn(name = "bookid",referencedColumnName = "id"),
            inverseJoinColumns = {@JoinColumn(name = "authorid",referencedColumnName = "id")})
    private List<Author> authors;


}
