package appointments.management.system.entities;

import java.io.Serializable;
import java.util.Set;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "citizens")
@PrimaryKeyJoinColumn(name = "user")
public class Citizen extends User implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@JsonIgnore
	@OneToMany(mappedBy = "citizen",targetEntity=Appointment.class,fetch = FetchType.LAZY)
	private Set<Appointment> apointments;

	public Citizen( String role, String username, String password, String email, String fullname,
			 String crn, String address, String birthday, Set<Appointment> apointments) {
		super(role, username, password, email, fullname, crn, address, birthday);
		this.apointments = apointments;
	}

	public Citizen(String role, String username, String password, String email, String fullname, String crn,
			String address, String birthday) {
		super(role, username, password, email, fullname, crn, address, birthday);
	}

	public Citizen(Set<Appointment> apointments) {
		super();
		this.apointments = apointments;
	}

	public Citizen() {
		super();
	}

	public Set<Appointment> getApointments() {
		return apointments;
	}

	public void setApointments(Set<Appointment> apointments) {
		this.apointments = apointments;
	}

	@Override
	public String toString() {
		return "Citizen [apointments=" + apointments + ", id=" + id + ", username=" + username + "]";
	}
	
	
}
