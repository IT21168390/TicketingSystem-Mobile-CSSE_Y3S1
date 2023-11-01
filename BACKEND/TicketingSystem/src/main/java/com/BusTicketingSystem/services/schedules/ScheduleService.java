package com.BusTicketingSystem.services.schedules;


        import com.BusTicketingSystem.dto.schedules.ScheduleDTO;
        import com.BusTicketingSystem.models.schedules.Schedule;
        import com.BusTicketingSystem.repositories.ScheduleRepository;

        import com.BusTicketingSystem.util.VarList;
        import org.modelmapper.ModelMapper;
        import org.modelmapper.TypeToken;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

        import javax.transaction.Transactional;
        import java.util.ArrayList;
        import java.util.List;

@Service
@Transactional
public class ScheduleService {

    @Autowired
    private ScheduleRepository ScheduleRepository;

    @Autowired
    private ModelMapper modelMapper;


    public String saveSchedule(ScheduleDTO scheduleDTO){
        if (ScheduleRepository.existsById(scheduleDTO.getScheduleId())){
            return VarList.RSP_DUPLICATED;
        }else {
            ScheduleRepository.save(modelMapper.map(scheduleDTO, Schedule.class));
            return VarList.RSP_SUCCESS;
        }
    }
    public String updateSchedule(ScheduleDTO scheduleDTO){
        if (ScheduleRepository.existsById(scheduleDTO.getScheduleId())){
            ScheduleRepository.save(modelMapper.map(scheduleDTO, Schedule.class));
            return VarList.RSP_SUCCESS;

        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
    public List<ScheduleDTO> getAllSchedule(){
        List<Schedule> employeeList = ScheduleRepository.findAll();
        return modelMapper.map(employeeList,new TypeToken<ArrayList<ScheduleDTO>>(){
        }.getType());
    }

    public ScheduleDTO searchSchedule(int empID){
        if (ScheduleRepository.existsById(empID)){
            Schedule employee =ScheduleRepository.findById(empID).orElse(null);
            return modelMapper.map(employee,ScheduleDTO.class);
        }else {
            return null;
        }
    }
    public String deleteSchedule(int empID){
        if (ScheduleRepository.existsById(empID)){
            ScheduleRepository.deleteById(empID);
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
}
