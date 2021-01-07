package appointments.management.system.entities;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;



@Entity
@Table(name = "supervisors")
@PrimaryKeyJoinColumn(name = "user")
public class Supervisor extends User  {
	@OneToOne(fetch = FetchType.EAGER, optional = true)
	@JoinColumn(name = "carrier_id", nullable = true, referencedColumnName = "id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	Carrier carrier;

	public Supervisor() {
		super();
	}

	public Supervisor(Carrier carrier) {
		super();
		this.carrier = carrier;
	}

	public Supervisor(String role, String username, String password, String email, String fullname, String crn,
			String address, String birthday) {
		super(role, username, password, email, fullname, crn, address, birthday);
	}

	public Supervisor(String role, String username, String password, String email, String fullname, String crn,
			String address, String birthday, Carrier carrier) {
		super(role, username, password, email, fullname, crn, address, birthday);
		this.carrier = carrier;
	}

	public Carrier getCarrier() {
		return carrier;
	}

	public void setCarrier(Carrier carrier) {
		this.carrier = carrier;
	}

	@Override
	public String toString() {
		return "Supervisor [carrier=" + carrier + ", id=" + id + ", username=" + username + "]";
	}

}
