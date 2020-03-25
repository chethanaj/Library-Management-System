package lk.chethana.apigateway;

import lk.chethana.apigateway.model.Role;
import lk.chethana.apigateway.model.User;
import lk.chethana.apigateway.model.UserRole;
import lk.chethana.apigateway.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import javax.persistence.Transient;
import java.util.Collections;

@EnableZuulProxy
@EnableDiscoveryClient
@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Bean
    RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
    @PostConstruct
    @Transient
    public void userNew(){
        User user = new User();
        user.setUsername("che@gmail.com");
        user.setEnabled(true);
        Role r = new Role();
        r.setRole(UserRole.LIBADMIN);
        r.setUsers(user);
        user.setRoles(Collections.singletonList(r));

        user.setPassword(passwordEncoder.encode("chethana"));
        userRepository.save(user);
    }
}
