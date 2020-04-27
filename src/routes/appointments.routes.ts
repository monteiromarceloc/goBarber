import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));
  const appointmentInSameDate = appointmentRepository.findByDate(parsedDate);

  if (appointmentInSameDate)
    return response.status(400).json({ msg: 'Appointment is already booked.' });

  const appointment = appointmentRepository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;
