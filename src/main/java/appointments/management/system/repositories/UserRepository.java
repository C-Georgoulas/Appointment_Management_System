package appointments.management.system.repositories;

import org.springframework.data.repository.CrudRepository;

import appointments.management.system.entities.User;


public interface UserRepository extends CrudRepository<User, Integer> {

	User findByUsername(String username);

	User findByEmail(String email);
}

