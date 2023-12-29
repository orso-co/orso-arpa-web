import { AppointmentStatus } from '../../enums/appointments/AppointmentStatus';
import { AppointmentParticipationListItemDto } from './AppointmentParticipationListItemDto';
import { ProjectDto } from '../projects/ProjectDto';
import { RoomDto } from '../rooms/RoomDto';
import { SectionsAllDto } from '../sections/SectionsAllDto';

export interface AppointmentDto {
  id: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  categoryId?: string;
  startTime: Date;
  endTime: Date;
  name: string;
  publicDetails?: string;
  internalDetails?: string;
  status?: AppointmentStatus;
  salaryId?: string;
  salaryPatternId?: string;
  expectationId?: string;
  venueId?: string;
  rooms: Array<RoomDto>;
  projects: Array<ProjectDto>;
  sections: Array<SectionsAllDto>;
  participations: Array<AppointmentParticipationListItemDto>;
}
