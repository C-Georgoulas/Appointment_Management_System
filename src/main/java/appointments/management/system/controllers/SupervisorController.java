package appointments.management.system.controllers;

import java.util.Collection;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import appointments.management.system.entities.Employee;
import appointments.management.system.exception.CustomException;
import appointments.management.system.services.CarrierService;
import appointments.management.system.services.EmployeeService;
import appointments.management.system.services.SupervisorService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/supervisor")
public class SupervisorController {
	@Autowired
	CarrierService carrierService;
	@Autowired
	SupervisorService supervisorService;
	@Autowired
	EmployeeService employeeService;

	@PostMapping("/{id}/carriers/create")
	@ResponseBody
	public Carrier NewCarrier(@PathVariable("id") int id, @RequestBody Carrier carrier) {
		return carrierService.save(carrier, id);
	}

	@GetMapping("/{id}/carriers")
	@ResponseBody
	public Carrier GetCarrier(@PathVariable("id") int id) {
		if (supervisorService.findById(id).getCarrier() == null) {
			throw new CustomException("No carrier found", HttpStatus.UNPROCESSABLE_ENTITY);
		}else {
		return supervisorService.findById(id).getCarrier();
		}
	}

	@PostMapping("/carriers/{id}/employees/create")
	@ResponseBody
	public Employee NewEmployee(@PathVariable("id") int id, @RequestBody Employee employee) {
		return employeeService.save(employee, id);
	}

	@GetMapping("/carriers/{id}/employees")
	@ResponseBody
	public Collection<Employee> GetEmployees(@PathVariable("id") int id) {
		return employeeService.findByCarrierId(id);
	}

	@GetMapping("/carriers/{id}/employees/{id2}")
	@ResponseBody
	public Employee GetEmployee(@PathVariable("id") int id, @PathVariable("id2") int id2) {
		return employeeService.findById(id2);
	}
	@PutMapping("/carriers/{id}/employees/{id2}/edit")
	@ResponseBody
	public Employee EditEmployee(@PathVariable("id") int id, @PathVariable("id2") int id2,@RequestBody Employee employee) {
		return employeeService.update(id2, employee);
	}

	@DeleteMapping("/carriers/{id}/employees/{id2}")
	@ResponseBody
	public ResponseEntity<String> DeleteEmployee(@PathVariable("id") int id, @PathVariable("id2") int id2) {
		employeeService.delete(id2);
		return new ResponseEntity<String>("DELETE Response", HttpStatus.ACCEPTED);
	}
}
