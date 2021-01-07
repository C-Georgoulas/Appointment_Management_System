package appointments.management.system.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.Table;
import javax.persistence.InheritanceType;

import com.sun.istack.NotNull;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "users")
public class User implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int id;
	@Column(nullable = false)
	private String role;
	@Column(unique = true)
	String username;
	@NotNull
	private String password;
	@Column(length = 45, nullable = false, unique = true)
	private String email;
	@Column(nullable = false)
	private String fullname;
	@Column(columnDefinition = "boolean default true", nullable = false)
	private boolean enabled = true;
	@Column(nullable = false)
	private String crn;
	@Column(nullable = false)
	private String address;
	@Column(nullable = false)
	private String birthday;
	
	public User() {
		super();
	}
	public User( String role, String username, String password, String email, String fullname,
			String crn, String address, String birthday) {
		super();
		this.role = role;
		this.username = username;
		this.password = password;
		this.email = email;
		this.fullname = fullname;
		this.crn = crn;
		this.address = address;
		this.birthday = birthday;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	public String getCrn() {
		return crn;
	}
	public void setCrn(String crn) {
		this.crn = crn;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", role=" + role + ", username=" + username + ", password=" + password + ", email="
				+ email + ", fullname=" + fullname + ", enabled=" + enabled + ", crn=" + crn + ", address=" + address
				+ ", birthday=" + birthday + "]";
	}
	
	
}
