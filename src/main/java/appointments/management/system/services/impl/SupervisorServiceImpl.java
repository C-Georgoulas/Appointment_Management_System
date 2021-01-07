package appointments.management.system.services.impl;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import appointments.management.system.entities.Supervisor;
import appointments.management.system.entities.Supervisor;
import appointments.management.system.repositories.SupervisorRepository;
import appointments.management.system.services.SupervisorService;
@Service
@Transactional
public class SupervisorServiceImpl implements SupervisorService {

	@Autowired
    private SupervisorRepository supervisorRepository;
    @Override
    public Supervisor save(Supervisor supervisor) {
        return supervisorRepository.save(supervisor);
    }

    @Override
    public Boolean delete(int id) {
        if (supervisorRepository.existsById(id)) {
            supervisorRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Supervisor update(Supervisor supervisor) {
        return supervisorRepository.save(supervisor);
    }

    @Override
    public Supervisor findById(int id) {
        return supervisorRepository.findById(id).get();
    }
    @Override
    public Supervisor findByUserName(String Username) {
        return supervisorRepository.findByUsername(Username);
    }
    @Override
    public Supervisor findByEmail(String email) {
        return supervisorRepository.findByEmail(email);
    }

    @Override
    public Collection<Supervisor> findAll() {
        Iterable<Supervisor> itr = supervisorRepository.findAll();
        return (Collection<Supervisor>) itr;
    }

}
