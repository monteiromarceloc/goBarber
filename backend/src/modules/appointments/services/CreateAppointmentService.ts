import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository) { }

  public async execute({ provider_id, date }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const appointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentInSameDate)
      throw new AppError('This appointment is already booked');

    const newAppointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return newAppointment;
  }
}

export default CreateAppointmentService;
