package appointments.management.system.services;

import java.util.Collection;

import appointments.management.system.entities.Carrier;

public interface CarrierService {
	Carrier save(Carrier carrier,int id);

	Boolean delete(int id);

	Carrier update(Carrier carrier);

	Carrier findById(int id);

	Collection<Carrier> findAll();
	Collection<Carrier> findByApproved(boolean approved);

}
