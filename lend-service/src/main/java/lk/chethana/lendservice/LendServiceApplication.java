package lk.chethana.lendservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication(scanBasePackages = {"lk.chethana.security","lk.chethana.lendservice"})
@EnableDiscoveryClient
public class LendServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(LendServiceApplication.class, args);
    }

    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

}
