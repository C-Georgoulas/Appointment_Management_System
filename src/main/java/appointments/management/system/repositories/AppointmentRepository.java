package appointments.management.system.repositories;

import java.util.Collection;

import org.springframework.data.repository.CrudRepository;

import appointments.management.system.entities.Appointment;
import appointments.management.system.entities.Employee;

public interface AppointmentRepository extends CrudRepository<Appointment, Integer> {
	Collection<Appointment> findByCarrierId(int id);
	Collection<Appointment> findByCitizenId(int id);

}
