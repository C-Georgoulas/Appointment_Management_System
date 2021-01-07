package appointments.management.system.services;

import java.util.Collection;

import appointments.management.system.entities.Employee;

public interface EmployeeService {
	Employee save(Employee employee,int id);

    Boolean delete(int id);

    Employee update(int id,Employee employee);

    Employee findById(int id);

     Employee findByUserName(String Username);

     Employee findByEmail(String email);

    Collection<Employee> findAll();
    
	Collection<Employee> findByCarrierId(int id);

}
