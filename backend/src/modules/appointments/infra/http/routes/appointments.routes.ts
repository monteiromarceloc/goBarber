import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {

  const { provider_id, date } = request.body;
  const dateIso = parseISO(date);
  const createAppointment = container.resolve(CreateAppointmentService);
  const appointment = await createAppointment.execute({ date: dateIso, provider_id });

  return response.json(appointment);
});

export default appointmentsRouter;
