package lk.chethana.apigateway.service;

import lk.chethana.apigateway.model.User;

public interface AuthService {
    String login(String username, String password);

    User saveUser(User user);

    boolean logout(String token);

    Boolean isValidToken(String token);

    String createNewToken(String token);
}
