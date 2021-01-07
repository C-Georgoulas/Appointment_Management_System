package appointments.management.system.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import appointments.management.system.entities.Appointment;
import appointments.management.system.entities.Carrier;
import appointments.management.system.exception.CustomException;
import appointments.management.system.services.AppointmentService;
import appointments.management.system.services.CarrierService;
import appointments.management.system.services.EmployeeService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/employee")
public class EmployeeController {

	@Autowired
	CarrierService carrierService;
	@Autowired
	EmployeeService employeeService;
	@Autowired
	AppointmentService appService;
	@GetMapping("/{id}/carriers")
	@ResponseBody
	public Carrier GetCarrier(@PathVariable("id") int id) {
		if (employeeService.findById(id).getCarrier() == null) {
			throw new CustomException("No carrier found", HttpStatus.UNPROCESSABLE_ENTITY);
		}else {
		return employeeService.findById(id).getCarrier();
		}
	}
	@GetMapping("/carriers/{id}/appointments")
	@ResponseBody
	public Collection<Appointment> AppointmentsByCarrier(@PathVariable("id") int id) {
		return appService.findByCarrierId(id);
	}
	@PutMapping("/carriers/{id}/appointments/{id2}/approve")
	@ResponseBody
	public Appointment Carriers(@PathVariable("id2") int id,@RequestBody Appointment app) {
		Appointment appointment=appService.findById(id);
		appointment.setApproved(app.isApproved());
		return appService.update(appointment);
	}
}
