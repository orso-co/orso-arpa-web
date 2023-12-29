import { AppointmentParticipationPrediction } from '../../enums/appointments/AppointmentParticipationPrediction';
import { AppointmentParticipationResult } from '../../enums/appointments/AppointmentParticipationResult';

export interface AppointmentParticipationDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  result?: AppointmentParticipationResult;
  prediction?: AppointmentParticipationPrediction;
  commentByPerformerInner?: string;
}
