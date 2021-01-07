package appointments.management.system.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.persistence.Column;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import appointments.management.system.entities.User;

public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;
	private int id;
	private String username;
	private String email;
	@JsonIgnore
	private String password;
	private String role;
	private String fullname;
	private String crn;
	private String address;
	private String birthday;

	public UserDetailsImpl(int id, String username, String email, String password,
			String role,String fullname,String crn,String address,String birthday) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.fullname=fullname;
		this.crn=crn;
		this.address=address;
		this.birthday=birthday;
	}

	public static UserDetailsImpl build(User user) {

		return new UserDetailsImpl(user.getId(), user.getUsername(), user.getEmail(), user.getPassword(),
				user.getRole(), user.getFullname(), user.getCrn(), user.getAddress(), user.getBirthday());
	}

	public int getId() {
		return id;
	}

	public String getRole() {
		return role;
	}

	public String getEmail() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}
}
