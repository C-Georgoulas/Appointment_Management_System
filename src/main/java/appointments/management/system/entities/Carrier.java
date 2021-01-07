package appointments.management.system.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "carriers")
public class Carrier  {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int id;
	@JsonIgnore 
	@OneToMany(targetEntity=Appointment.class,fetch = FetchType.LAZY, mappedBy="carrier")   
	private Set<Appointment> apointments;
	@JsonIgnore
	@OneToMany(targetEntity=Employee.class,fetch = FetchType.LAZY, cascade = CascadeType.ALL,mappedBy="carrier")   
	private Set<Employee> employees;
	@Column(nullable = false)
	private String name;
	@Lob 
	@Column(nullable = true, length=512)
	private String description;
	@Column(columnDefinition = "boolean default false", nullable = false)
	private boolean approved;
	@Column(nullable = false)
	private String phone;
	public Carrier(int id, Set<Appointment> apointments, Set<Employee> employees, String name,
			String description, boolean approved, String phone) {
		super();
		this.id=id;
		this.apointments = apointments;
		this.employees = employees;
		this.name = name;
		this.description = description;
		this.approved = approved;
		this.phone = phone;
	}
	
	public Carrier(String name, String description, String phone) {
		super();
		this.name = name;
		this.description = description;
		this.phone = phone;
	}

	public Carrier() {
		super();
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Set<Appointment> getApointments() {
		return apointments;
	}
	public void setApointments(Set<Appointment> apointments) {
		this.apointments = apointments;
	}
	public Set<Employee> getEmployees() {
		return employees;
	}
	public void setEmployees(Set<Employee> employees) {
		this.employees = employees;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isApproved() {
		return approved;
	}
	public void setApproved(boolean approved) {
		this.approved = approved;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	@Override
	public String toString() {
		return "Carrier [apointments=" + apointments + ", employees=" + employees
				+ ", name=" + name + ", description=" + description + ", approved=" + approved + ", phone=" + phone
				+ "]";
	}
	
	
}
