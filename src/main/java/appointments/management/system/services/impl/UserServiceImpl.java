package appointments.management.system.services.impl;

import java.util.Collection;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import appointments.management.system.dto.UserDto;
import appointments.management.system.entities.Citizen;
import appointments.management.system.entities.Employee;
import appointments.management.system.entities.Supervisor;
import appointments.management.system.entities.User;
import appointments.management.system.exception.CustomException;
import appointments.management.system.repositories.CitizenRepository;
import appointments.management.system.repositories.EmployeeRepository;
import appointments.management.system.repositories.SupervisorRepository;
import appointments.management.system.repositories.UserRepository;
import appointments.management.system.services.CitizenService;
import appointments.management.system.services.EmployeeService;
import appointments.management.system.services.SupervisorService;
import appointments.management.system.services.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	PasswordEncoder passwordEncode;

	@Override
	public User save(User user) {
		if (userRepository.findByEmail(user.getEmail()) != null) {
			throw new CustomException("Email is already in use", HttpStatus.UNPROCESSABLE_ENTITY);

		} else if (userRepository.findByUsername(user.getUsername()) != null) {
			throw new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
		} else {
			user.setPassword(passwordEncode.encode(user.getPassword()));
			if (user.getRole().equals("ROLE_SUPERVISOR")) {
				Supervisor supervisor = new Supervisor(user.getRole(), user.getUsername(), user.getPassword(),
						user.getEmail(), user.getFullname(), user.getCrn(), user.getAddress(), user.getBirthday());
				return userRepository.save(supervisor);
			} else if (user.getRole().equals("ROLE_EMPLOYEE")) {
				Employee employee = new Employee(user.getRole(), user.getUsername(), user.getPassword(),
						user.getEmail(), user.getFullname(), user.getCrn(), user.getAddress(), user.getBirthday());
				return userRepository.save(employee);
			} else if (user.getRole().equals("ROLE_CITIZEN")) {
				Citizen citizen = new Citizen(user.getRole(), user.getUsername(), user.getPassword(), user.getEmail(),
						user.getFullname(), user.getCrn(), user.getAddress(), user.getBirthday());
				return userRepository.save(citizen);
			} else {
				return userRepository.save(user);
			}
		}
	}

	@Override
	public Boolean delete(int id) {
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public User update(int id, User user) {
		User newUser = userRepository.findById(id).get();
		if ((!newUser.getUsername().equals(user.getUsername()))
				&& (userRepository.findByUsername(user.getUsername()) != null)) {
			throw new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
		} else if ((!newUser.getEmail().equals(user.getEmail()))
				&& (userRepository.findByEmail(user.getEmail()) != null)) {
			throw new CustomException("Email is already in use", HttpStatus.UNPROCESSABLE_ENTITY);

		} else {
			newUser.setAddress(user.getAddress());
			newUser.setEmail(user.getEmail());
			newUser.setFullname(user.getFullname());
			newUser.setUsername(user.getUsername());
			newUser.setCrn(user.getCrn());
			newUser.setBirthday(user.getBirthday());
			if (!newUser.getPassword().equals(user.getPassword())) {
				newUser.setPassword(passwordEncode.encode(user.getPassword()));
			}
			return userRepository.save(newUser);
		}

	}

	@Override
	public User findById(int id) {
		return userRepository.findById(id).get();
	}

	@Override
	public User findByUserName(String Username) {
		return userRepository.findByUsername(Username);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public Collection<User> findAll() {
		Iterable<User> itr = userRepository.findAll();
		return (Collection<User>) itr;
	}
}
