package appointments.management.system.services;

import java.util.Collection;

import appointments.management.system.entities.Citizen;

public interface CitizenService {
	Citizen save(Citizen citizen);

	Boolean delete(int id);

	Citizen update(Citizen citizen);

	Citizen findById(int id);

	Citizen findByUserName(String Username);

	Citizen findByEmail(String email);

	Collection<Citizen> findAll();
}