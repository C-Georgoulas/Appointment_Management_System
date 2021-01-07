package appointments.management.system.services.impl;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import appointments.management.system.entities.Carrier;
import appointments.management.system.entities.Employee;
import appointments.management.system.entities.Supervisor;
import appointments.management.system.exception.CustomException;
import appointments.management.system.entities.Carrier;
import appointments.management.system.repositories.CarrierRepository;
import appointments.management.system.repositories.SupervisorRepository;
import appointments.management.system.services.CarrierService;
import appointments.management.system.services.SupervisorService;

@Service
@Transactional
public class CarrierServiceImpl implements CarrierService {

	@Autowired
	private CarrierRepository carrierRepository;
	@Autowired
	private SupervisorService supervisorService;

	@Override
	public Carrier save(Carrier carrier, int id) {
		Supervisor supervisor = supervisorService.findById(id);
		if(supervisor.getCarrier()!=null) {
			throw new CustomException("Supervisor has already carrier", HttpStatus.UNPROCESSABLE_ENTITY);
		}
		supervisor.setCarrier(carrier);
		supervisorService.update(supervisor);
		return carrierRepository.save(carrier);
	}

	@Override
	public Boolean delete(int id) {
		if (carrierRepository.existsById(id)) {
			carrierRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public Carrier update(Carrier carrier) {
		return carrierRepository.save(carrier);
	}

	@Override
	public Carrier findById(int id) {
		return carrierRepository.findById(id).get();
	}

	@Override
	public Collection<Carrier> findAll() {
		Iterable<Carrier> itr = carrierRepository.findAll();
		return (Collection<Carrier>) itr;
	}

	@Override
	public Collection<Carrier> findByApproved(boolean approved) {
		// TODO Auto-generated method stub
		return carrierRepository.findByApproved(approved);
	}
	

}
