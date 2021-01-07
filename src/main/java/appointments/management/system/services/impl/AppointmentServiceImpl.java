package appointments.management.system.services.impl;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import appointments.management.system.entities.Appointment;
import appointments.management.system.entities.Carrier;
import appointments.management.system.entities.Citizen;
import appointments.management.system.entities.Appointment;
import appointments.management.system.repositories.AppointmentRepository;
import appointments.management.system.services.AppointmentService;
import appointments.management.system.services.CarrierService;
import appointments.management.system.services.CitizenService;
import appointments.management.system.services.SupervisorService;
@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
    private AppointmentRepository appointmentRepository;
	@Autowired
	private CarrierService carrierService;
	@Autowired
	private CitizenService citizenService;
    @Override
    public Appointment save(Appointment appointment,int id,int id2) {
    	Carrier carrier=carrierService.findById(id2);
    	Citizen citizen=citizenService.findById(id);
    	appointment.setCarrier(carrier);
    	appointment.setCitizen(citizen);    	
        return appointmentRepository.save(appointment);
    }

    @Override
    public Boolean delete(int id) {
        if (appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Appointment update(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment findById(int id) {
        return appointmentRepository.findById(id).get();
    }

    @Override
    public Collection<Appointment> findAll() {
        Iterable<Appointment> itr = appointmentRepository.findAll();
        return (Collection<Appointment>) itr;
    }

	@Override
	public Collection<Appointment> findByCarrierId(int id) {
		//System.out.println(appointmentRepository.findByCarrierId(id));
		return appointmentRepository.findByCarrierId(id);
	}

	@Override
	public Collection<Appointment> findByCitizenId(int id) {
		// TODO Auto-generated method stub
		return appointmentRepository.findByCitizenId(id);
	}

}
