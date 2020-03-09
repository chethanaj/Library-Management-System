package lk.chethana.bookservice.repository;

import lk.chethana.bookservice.model.Book;
import lk.chethana.bookservice.model.BookSearchQueryCriteriaConsumer;
import lk.chethana.bookservice.model.SearchCriteria;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

@Component
public  class BookRepositoryImpl{

    @PersistenceContext
    private EntityManager entityManager;

    public List<Book> searchUser(List<SearchCriteria> params) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Book> query = builder.createQuery(Book.class);
        Root r = query.from(Book.class);

        Predicate predicate = builder.conjunction();

        BookSearchQueryCriteriaConsumer searchConsumer =
                new BookSearchQueryCriteriaConsumer(predicate, builder, r);
        params.stream().forEach(searchConsumer);
        predicate = searchConsumer.getPredicate();
        query.where(predicate);

        List<Book> result = entityManager.createQuery(query).getResultList();
        return result;
    }

}
