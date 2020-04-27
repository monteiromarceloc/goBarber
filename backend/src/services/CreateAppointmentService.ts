import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const parsedDate = startOfHour(date);
    const appointmentInSameDate = this.appointmentRepository.findByDate(
      parsedDate,
    );

    if (appointmentInSameDate)
      throw Error('This appointment is already booked');

    const appointment = this.appointmentRepository.create({
      provider,
      date: parsedDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
