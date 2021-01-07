package appointments.management.system.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import appointments.management.system.entities.Appointment;
import appointments.management.system.entities.Carrier;
import appointments.management.system.entities.User;
import appointments.management.system.services.AppointmentService;
import appointments.management.system.services.CarrierService;
import appointments.management.system.services.UserService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/citizen")
public class CitizenController {
	@Autowired
	CarrierService carrierService;
	@Autowired
	AppointmentService appService;

	@GetMapping("/carriers")
	@ResponseBody
	public Collection<Carrier> Carriers() {
		return carrierService.findByApproved(true);
	}
	@GetMapping("/carriers/{id}")
	@ResponseBody
	public Carrier CarrierById(@PathVariable("id") int id) {
		return carrierService.findById(id);
	}
	@GetMapping("/{id}/appointments")
	@ResponseBody
	public Collection<Appointment> MyAppointments(@PathVariable("id") int id) {
		return appService.findByCitizenId(id);
	}
	@PostMapping("/{id}/carriers/{id2}/appointment/create")
	@ResponseBody
	public Appointment CarrierByI(@RequestBody Appointment app,@PathVariable("id") int id,@PathVariable("id2") int id2) {
		return appService.save(app,id,id2);
	}
}
