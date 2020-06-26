import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import Appointment from '../../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(a => isEqual(a.date, date));
    return appointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id
    })
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
