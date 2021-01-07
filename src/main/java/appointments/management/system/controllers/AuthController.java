package appointments.management.system.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import appointments.management.system.entities.Citizen;
import appointments.management.system.entities.User;
import appointments.management.system.payload.request.LoginRequest;
import appointments.management.system.payload.response.JwtResponse;
import appointments.management.system.payload.response.MessageResponse;
import appointments.management.system.repositories.UserRepository;
import appointments.management.system.security.jwt.JwtUtils;
import appointments.management.system.security.services.UserDetailsImpl;
import appointments.management.system.services.CitizenService;
import appointments.management.system.services.UserService;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;
	@Autowired
	CitizenService citizenService;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	UserService userService;
	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
		//User user=new User("ROLE_ADMIN","admin","admin199","admin199@gmail.com","admin pap","1111","kallithea","30/1/1999");
		//userService.save(user);
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		
		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 userDetails.getRole(),
												 userDetails.getFullname(),
												 userDetails.getCrn(),
												 userDetails.getAddress(),
												 userDetails.getBirthday()));
	}
	@PostMapping("/signup")
	public ResponseEntity<?> citizenSignup(@RequestBody Citizen citizen) {
		citizenService.save(citizen);
		return ResponseEntity.ok(new MessageResponse("Citizen registered successfully!"));	}
	
	
}
