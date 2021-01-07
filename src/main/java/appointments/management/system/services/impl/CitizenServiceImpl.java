package appointments.management.system.services.impl;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import appointments.management.system.entities.Citizen;
import appointments.management.system.exception.CustomException;
import appointments.management.system.entities.Citizen;
import appointments.management.system.repositories.CitizenRepository;
import appointments.management.system.repositories.UserRepository;
import appointments.management.system.services.CitizenService;

@Service
@Transactional
public class CitizenServiceImpl implements CitizenService {

	@Autowired
	private CitizenRepository citizenRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	PasswordEncoder passwordEncode;
	@Override
	public Citizen save(Citizen citizen) {
		citizen.setRole("ROLE_CITIZEN");
		citizen.setPassword(passwordEncode.encode(citizen.getPassword()));
		if (userRepository.findByEmail(citizen.getEmail()) != null) {
			throw new CustomException("Email is already in use", HttpStatus.UNPROCESSABLE_ENTITY);

		} else if (userRepository.findByUsername(citizen.getUsername()) != null) {
			throw new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
		} else {
			return citizenRepository.save(citizen);
		}
	}

	@Override
	public Boolean delete(int id) {
		if (citizenRepository.existsById(id)) {
			citizenRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public Citizen update(Citizen citizen) {
		return citizenRepository.save(citizen);
	}

	@Override
	public Citizen findById(int id) {
		return citizenRepository.findById(id).get();
	}

	@Override
	public Citizen findByUserName(String Username) {
		return citizenRepository.findByUsername(Username);
	}

	@Override
	public Citizen findByEmail(String email) {
		return citizenRepository.findByEmail(email);
	}

	@Override
	public Collection<Citizen> findAll() {
		Iterable<Citizen> itr = citizenRepository.findAll();
		return (Collection<Citizen>) itr;
	}

}
