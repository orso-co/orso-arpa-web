import { AppointmentParticipationPrediction } from '@arpa/core';

export interface SetMyAppointmentParticipationPredictionDto {
  commentByPerformerInner?: string;
  prediction: AppointmentParticipationPrediction;
}
