package lk.chethana.security.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lk.chethana.security.DTO.LoginRequest;
import lk.chethana.security.SecurityConstants;
import lk.chethana.security.entity.ApplicationUser;
import lk.chethana.security.entity.Role;
import lk.chethana.security.repository.ApplicationUserRepository;
import lk.chethana.security.repository.ApplicationUserRoleRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class UserService {

    private ApplicationUserRepository applicationUserRepository;
    private ApplicationUserRoleRepository userRoleRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private AuthenticationManager authenticationManager;

    public UserService(ApplicationUserRepository applicationUserRepository,
                       ApplicationUserRoleRepository userRoleRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder, AuthenticationManager authenticationManager) {
        this.applicationUserRepository = applicationUserRepository;
        this.userRoleRepository = userRoleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public ApplicationUser signUp(ApplicationUser user) {

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        ApplicationUser applicationUser = applicationUserRepository.save(user);
        List<Role> roles = new ArrayList<>();
        user.getRoles().forEach((role) ->
                role.setUser(applicationUser)
        );
        userRoleRepository.saveAll(roles);

        return applicationUser;
    }

    public String login(LoginRequest user) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword(),
                        new ArrayList<>())
        );

        if (authentication.isAuthenticated()) {
            return JWT.create()
                    .withSubject(((User) authentication.getPrincipal()).getUsername())
                    .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                    .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));
        }else {
            return null;
        }

    }

    public ApplicationUser getUserByUsername(String username){
        return applicationUserRepository.findByUsername(username);

    }



}
