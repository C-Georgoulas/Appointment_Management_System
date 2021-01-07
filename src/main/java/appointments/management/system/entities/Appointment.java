package appointments.management.system.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "appointments")
public class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int id;
	@Column(nullable = false)
	private String appointmentDate;
	@Column(nullable = false)
	private String citizenFullName;
	@Column(nullable = false)
	private String citizenCRN;
	@Column(columnDefinition = "boolean default false", nullable = false)
	private boolean approved ;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="carrier_id", referencedColumnName="id",nullable=false)
	@JsonIgnore
    private Carrier carrier;
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="citizen_id", referencedColumnName="user",nullable=false)
	@JsonIgnore
    private Citizen citizen;
	
	
	public Appointment(int id, String appointmentDate, String citizenFullName, String citizenCRN, boolean approved,
			Carrier carrier, Citizen citizen) {
		super();
		this.id = id;
		this.appointmentDate = appointmentDate;
		this.citizenFullName = citizenFullName;
		this.citizenCRN = citizenCRN;
		this.approved = approved;
		this.carrier = carrier;
		this.citizen = citizen;
	}
	
	public Appointment(String appointmentDate, String citizenFullName, String citizenCRN, boolean approved) {
		super();
		this.appointmentDate = appointmentDate;
		this.citizenFullName = citizenFullName;
		this.citizenCRN = citizenCRN;
		this.approved = approved;
	}

	public Appointment() {
		super();
	}
	
	public Citizen getCitizen() {
		return citizen;
	}

	public void setCitizen(Citizen citizen) {
		this.citizen = citizen;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAppointmentDate() {
		return appointmentDate;
	}
	public void setAppointmentDate(String appointmentDate) {
		this.appointmentDate = appointmentDate;
	}
	public String getCitizenFullName() {
		return citizenFullName;
	}
	public void setCitizenFullName(String citizenFullName) {
		this.citizenFullName = citizenFullName;
	}
	public String getCitizenCRN() {
		return citizenCRN;
	}
	public void setCitizenCRN(String citizenCRN) {
		this.citizenCRN = citizenCRN;
	}
	public boolean isApproved() {
		return approved;
	}
	public void setApproved(boolean approved) {
		this.approved = approved;
	}
	public Carrier getCarrier() {
		return carrier;
	}
	public void setCarrier(Carrier carrier) {
		this.carrier = carrier;
	}
	@Override
	public String toString() {
		return "Appointment [id=" + id + ", AppointmentDate=" + appointmentDate + ", citizenFullName=" + citizenFullName
				+ ", citizenCRN=" + citizenCRN + ", approved=" + approved + ", carrier=" + carrier + "]";
	}
	
	
}
