import { AppointmentStatus } from '../../enums/appointments/AppointmentStatus';
import { AppointmentParticipationPrediction } from '../../enums/appointments/AppointmentParticipationPrediction';
import { AppointmentParticipationResult } from '../../enums/appointments/AppointmentParticipationResult';
import { ProjectDto } from '../projects/ProjectDto';
import { RoomDto } from '../rooms/RoomDto';
import { VenueDto } from '../venues/VenueDto';

export interface MyAppointmentDto {
  id: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  startTime?: Date;
  endTime?: Date;
  name?: string;
  projects?: Array<ProjectDto>;
  venue?: VenueDto;
  rooms?: Array<RoomDto>;
  publicDetails?: string;
  expectation?: string;
  result?: AppointmentParticipationResult;
  prediction?: AppointmentParticipationPrediction;
  categoryId?: string;
  status?: AppointmentStatus;
  commentByPerformerInner?: string;
}
