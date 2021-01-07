package appointments.management.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import appointments.management.system.entities.User;
import appointments.management.system.repositories.UserRepository;
import appointments.management.system.services.UserService;

@Component
public class EventListenerExampleBean {
	@Autowired
	UserService userService;
	
	@EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
		if (userService.findAll().isEmpty()) {
			User user=new User("ROLE_ADMIN","admin","admin","admin@gmail.com","admin","1111","kallithea","30/1/1999");
			userService.save(user);
		}
    }
}
