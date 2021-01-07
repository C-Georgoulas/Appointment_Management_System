package appointments.management.system.services.impl;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import appointments.management.system.entities.Appointment;
import appointments.management.system.entities.Carrier;
import appointments.management.system.entities.Employee;
import appointments.management.system.entities.User;
import appointments.management.system.exception.CustomException;
import appointments.management.system.repositories.CarrierRepository;
import appointments.management.system.repositories.EmployeeRepository;
import appointments.management.system.repositories.UserRepository;
import appointments.management.system.services.CarrierService;
import appointments.management.system.services.EmployeeService;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private CarrierService carrierService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	PasswordEncoder passwordEncode;

	@Override
	public Employee save(Employee employee, int id) {
		if (userRepository.findByEmail(employee.getEmail()) != null) {
			throw new CustomException("Email is already in use", HttpStatus.UNPROCESSABLE_ENTITY);

		} else if (userRepository.findByUsername(employee.getUsername()) != null) {
			throw new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
		} else {
			Carrier carrier = carrierService.findById(id);
			employee.setRole("ROLE_EMPLOYEE");
			employee.setPassword(passwordEncode.encode(employee.getPassword()));
			employee.setCarrier(carrier);
			return employeeRepository.save(employee);
		}
	}

	@Override
	public Boolean delete(int id) {
		if (employeeRepository.existsById(id)) {
			employeeRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public Employee update(int id,Employee employee) {
		Employee ex_employee = employeeRepository.findById(id).get();
		if ((!ex_employee.getUsername().equals(ex_employee.getUsername()))
				&& (userRepository.findByUsername(ex_employee.getUsername()) != null)) {
			throw new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
		} else if ((!ex_employee.getEmail().equals(ex_employee.getEmail()))
				&& (userRepository.findByEmail(ex_employee.getEmail()) != null)) {
			throw new CustomException("Email is already in use", HttpStatus.UNPROCESSABLE_ENTITY);

		} else {
			ex_employee.setAddress(employee.getAddress());
			ex_employee.setEmail(employee.getEmail());
			ex_employee.setFullname(employee.getFullname());
			ex_employee.setUsername(employee.getUsername());
			ex_employee.setCrn(employee.getCrn());
			ex_employee.setBirthday(employee.getBirthday());
			if (!ex_employee.getPassword().equals(employee.getPassword())) {
				ex_employee.setPassword(passwordEncode.encode(employee.getPassword()));
			}
			return employeeRepository.save(ex_employee);
		}
	}

	@Override
	public Employee findById(int id) {
		return employeeRepository.findById(id).get();
	}

	@Override
	public Collection<Employee> findByCarrierId(int id) {
		return employeeRepository.findByCarrierId(id);
	}

	@Override
	public Employee findByUserName(String Username) {
		return employeeRepository.findByUsername(Username);
	}

	@Override
	public Employee findByEmail(String email) {
		return employeeRepository.findByEmail(email);
	}

	@Override
	public Collection<Employee> findAll() {
		Iterable<Employee> itr = employeeRepository.findAll();
		return (Collection<Employee>) itr;
	}

}
