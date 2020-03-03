package lk.chethana.bookservice.controller;

import lk.chethana.bookservice.model.Book;
import lk.chethana.bookservice.service.BookServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/services")
public class BookController {

    @Autowired
    BookServiceImpl bookService;

    @RequestMapping(value = "/addBook", method = RequestMethod.POST)
    public Book addNewBook(@RequestBody Book book) {

        return bookService.addBook(book);
    }

    @RequestMapping(value = "/getBook/{id}",method = RequestMethod.GET)
    public Optional <Book> getBookById(@PathVariable Integer id){
        return bookService.findById(id);
    }

    @RequestMapping(value = "/updateBook/{id}",method = RequestMethod.PUT)
    public Book updateBook(@PathVariable Integer id,@RequestBody Book bookDetails){
         Optional <Book>book=bookService.findById(id);
         Book updatedBook=null;
         if(book.isPresent()){
             Book newBook=book.get();
             newBook.setIsbn(bookDetails.getIsbn());
             newBook.setTitle(bookDetails.getTitle());
             newBook.setSubject(bookDetails.getSubject());
             newBook.setPublisher(bookDetails.getPublisher());
             newBook.setLanguage(bookDetails.getLanguage());
             newBook.setNoOfPages(bookDetails.getNoOfPages());
             newBook.setAuthors(bookDetails.getAuthors());
             updatedBook=bookService.addBook(newBook);
         }else {
             System.out.println("This book doesn't exist");
         }

         return updatedBook;

    }

    @GetMapping(value = "/allBooks")
    public List <Book> getAllBooks(){
        return bookService.getAllBooks();
    }

    @RequestMapping(value = "/deleteBook/{id}",method = RequestMethod.DELETE)
    public void deleteBookById(@PathVariable Integer id){
        bookService.deleteBook(id);
    }
}
