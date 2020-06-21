import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const appointmentsRepository = new AppointmentsRepository();
  const { provider_id, date } = request.body;
  const dateIso = parseISO(date);
  const createAppointment = new CreateAppointmentService(appointmentsRepository);
  const appointment = await createAppointment.execute({ date: dateIso, provider_id });

  return response.json(appointment);
});

export default appointmentsRouter;
