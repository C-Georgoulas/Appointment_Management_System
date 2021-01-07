package appointments.management.system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class AppointmentsManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppointmentsManagementApplication.class, args);
	}

}
