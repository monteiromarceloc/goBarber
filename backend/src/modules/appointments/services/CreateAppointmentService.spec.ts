import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from "./CreateAppointmentService";
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
  });

  it('should be able create a new appointment', async () => {
    const date = new Date();
    const provider_id = '123456'
    const appointment = await createAppointment.execute({
      date,
      provider_id
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(provider_id);
  })

  it('should not be able create two appointments at same time', async () => {
    const date = new Date(2020, 4, 10, 11);
    const provider_id = '123456'
    await createAppointment.execute({
      date,
      provider_id
    });
    await expect(createAppointment.execute({
      date,
      provider_id
    })).rejects.toBeInstanceOf(AppError);
  })


})
