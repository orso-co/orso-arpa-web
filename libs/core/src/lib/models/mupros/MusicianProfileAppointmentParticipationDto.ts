import { AppointmentListDto } from '../appointments/AppointmentListDto';
import { AppointmentParticipationDto } from '../appointments/AppointmentParticipationDto';

export interface MusicianProfileAppointmentParticipationDto {
  appointmentParticipation: AppointmentParticipationDto;
  appointment: AppointmentListDto;
}
