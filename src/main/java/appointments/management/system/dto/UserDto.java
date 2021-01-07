package appointments.management.system.dto;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.sun.istack.NotNull;

public class UserDto {
	int id;
	private String role;
	String username;
	private String password;
	private String email;
	private String fullname;
	private boolean enabled = true;
	private String crn;
	private String address;
	private String birthday;
	public UserDto(int id, String role, String username, String password, String email, String fullname,
			boolean enabled, String crn, String address, String birthday) {
		super();
		this.id = id;
		this.role = role;
		this.username = username;
		this.password = password;
		this.email = email;
		this.fullname = fullname;
		this.enabled = enabled;
		this.crn = crn;
		this.address = address;
		this.birthday = birthday;
	}
	public UserDto() {
		super();
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
		return "UserDto [id=" + id + ", role=" + role + ", username=" + username + ", password=" + password + ", email="
				+ email + ", fullname=" + fullname + ", enabled=" + enabled + ", crn=" + crn + ", address=" + address
				+ ", birthday=" + birthday + "]";
	}
	
	
}
