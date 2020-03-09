package lk.chethana.apigateway.service;

import lk.chethana.apigateway.exception.CustomException;
import lk.chethana.apigateway.model.JwtToken;
import lk.chethana.apigateway.model.Role;
import lk.chethana.apigateway.model.User;
import lk.chethana.apigateway.repo.JwtTokenRepository;
import lk.chethana.apigateway.repo.UserRepository;
import lk.chethana.apigateway.repo.UserRoleRepository;
import lk.chethana.apigateway.security.provider.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenRepository jwtTokenRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    public String login(String username, String password) {
        try {

            User user = userRepository.findByUsername(username);
            if (user == null || user.getRoles() == null || user.getRoles().isEmpty()) {
                throw new CustomException("Invalid username or password.", HttpStatus.UNAUTHORIZED);
            }
            List<GrantedAuthority> authorities = new ArrayList<>();
            user.getRoles().forEach(r -> authorities.add(new SimpleGrantedAuthority(r.getRole().toString())));
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),
                    password, authorities));
            //NOTE: normally we dont need to add "ROLE_" prefix. Spring does automatically for us.
            //Since we are using custom token using JWT we should add ROLE_ prefix
            String token = jwtTokenProvider.createToken(username, user.getRoles().stream()
                    .map((Role role) -> "ROLE_" + role.getRole().toString()).filter(Objects::nonNull).collect(Collectors.toList()));
            return token;

        } catch (AuthenticationException e) {
            throw new CustomException("Invalid username or password.", HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepository.save(user);
        for (Role r : user.getRoles()) {
            r.setUsers(user);
        }
        userRoleRepository.saveAll(user.getRoles());
        return user;
    }

    @Override
    public boolean logout(String token) {
        jwtTokenRepository.delete(new JwtToken(token));
        return true;
    }

    @Override
    public Boolean isValidToken(String token) {
        return jwtTokenProvider.validateToken(token);
    }

    @Override
    public String createNewToken(String token) {
        String username = jwtTokenProvider.getUsername(token);
        List<String> roleList = jwtTokenProvider.getRoleList(token);
        String newToken = jwtTokenProvider.createToken(username, roleList);
        return newToken;
    }
}
