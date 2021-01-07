package appointments.management.system.repositories;

import org.springframework.data.repository.CrudRepository;

import appointments.management.system.entities.Citizen;

public interface CitizenRepository extends CrudRepository<Citizen, Integer> {

	Citizen findByUsername(String username);

	Citizen findByEmail(String email);
}
