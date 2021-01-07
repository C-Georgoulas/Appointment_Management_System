package appointments.management.system.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;



@Entity
@Table(name = "employees")
@PrimaryKeyJoinColumn(name = "user")
public class Employee extends User{
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="carrier_id", referencedColumnName="id",nullable=true)
    private Carrier carrier;

	public Employee(String role, String username, String password, String email, String fullname, String crn,
			String address, String birthday) {
		super(role, username, password, email, fullname, crn, address, birthday);
	}

	public Employee(String role, String username, String password, String email, String fullname,
			String crn, String address, String birthday, Carrier carrier) {
		super( role, username, password, email, fullname, crn, address, birthday);
		this.carrier = carrier;
	}

	public Employee(Carrier carrier) {
		super();
		this.carrier = carrier;
	}

	public Employee() {
		super();
	}

	public Carrier getCarrier() {
		return carrier;
	}

	public void setCarrier(Carrier carrier) {
		this.carrier = carrier;
	}

	@Override
	public String toString() {
		return "Employee [carrier=" + carrier + ", id=" + id + ", username=" + username + "]";
	}
	
}
