package appointments.management.system.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import appointments.management.system.entities.Carrier;
import appointments.management.system.entities.User;
import appointments.management.system.services.CarrierService;
import appointments.management.system.services.UserService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	UserService userService;
	@Autowired
	CarrierService carrierService;
	@GetMapping("/users")
	@ResponseBody
	public Collection<User> Users() {
		
		return userService.findAll();
	}

	@GetMapping("/users/{id}")
	@ResponseBody
	public User UserById(@PathVariable("id") int id) {
		return userService.findById(id);
	}

	@DeleteMapping("/users/{id}")
	@ResponseBody
	public ResponseEntity<String> DeleteUserById(@PathVariable("id") int id) {
		userService.delete(id);
		return new ResponseEntity<String>("DELETE Response", HttpStatus.ACCEPTED);
	}

	@PostMapping("/users/create")
	@ResponseBody
	public User NewUser(@RequestBody User user) {
		return userService.save(user);
	}

	@PutMapping("/users/{id}/edit")
	@ResponseBody
	public User EditUser(@PathVariable("id") int id, @RequestBody User user) {
		return userService.update(id, user);
	}
	@GetMapping("/carriers")
	@ResponseBody
	public Collection<Carrier> GetCarriers() {
		return carrierService.findAll();
	}
	@PutMapping("/carriers/{id}/approve")
	@ResponseBody
	public Carrier ApproveCarrier(@PathVariable("id")int id,@RequestBody Carrier carr) {
		Carrier carrier=carrierService.findById(id);
		carrier.setApproved(carr.isApproved());
		return carrierService.update(carrier);
	}
}
