package lk.chethana.bookservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String authorName;


    @ManyToMany(mappedBy = "authors",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Book> books;
}
