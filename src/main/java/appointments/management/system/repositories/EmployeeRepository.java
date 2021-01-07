package appointments.management.system.repositories;

import java.util.Collection;

import org.springframework.data.repository.CrudRepository;

import appointments.management.system.entities.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {

	Employee findByUsername(String username);

	Employee findByEmail(String email);
	Collection<Employee> findByCarrierId(int id);
}