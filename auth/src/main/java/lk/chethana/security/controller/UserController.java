package lk.chethana.security.controller;

import lk.chethana.security.DTO.LoginRequest;
import lk.chethana.security.entity.ApplicationUser;
import lk.chethana.security.entity.Role;
import lk.chethana.security.repository.ApplicationUserRepository;
import lk.chethana.security.repository.ApplicationUserRoleRepository;
import lk.chethana.security.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    @PostMapping("/sign-up")
    public ApplicationUser signUp(@RequestBody ApplicationUser user) {

        return userService.signUp(user);
    }

    @PostMapping("/sign-in")
    public String login(@RequestBody LoginRequest loginRequest) {

        return userService.login(loginRequest);

    }
}
