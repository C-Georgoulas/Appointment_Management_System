package appointments.management.system.services;

import java.util.Collection;

import appointments.management.system.entities.User;


public interface UserService {
	User save(User user);

    Boolean delete(int id);

    User update(int id,User user);

    User findById(int id);

     User findByUserName(String Username);

     User findByEmail(String email);

    Collection<User> findAll();
}
