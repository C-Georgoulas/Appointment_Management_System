package appointments.management.system.services;

import java.util.Collection;

import appointments.management.system.entities.Appointment;
import appointments.management.system.entities.Employee;

public interface AppointmentService {
	Appointment save(Appointment appointment,int id,int id2);

	Boolean delete(int id);

	Appointment update(Appointment appointment);

	Appointment findById(int id);

	Collection<Appointment> findAll();
	Collection<Appointment> findByCarrierId(int id);
	Collection<Appointment> findByCitizenId(int id);

}
