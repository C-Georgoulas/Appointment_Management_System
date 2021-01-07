package appointments.management.system.repositories;

import java.util.Collection;

import org.springframework.data.repository.CrudRepository;

import appointments.management.system.entities.Carrier;
import appointments.management.system.entities.Employee;

public interface CarrierRepository extends CrudRepository<Carrier, Integer> {
	Collection<Carrier> findByApproved(boolean approved);

	
}