import { ProjectDto } from './ProjectDto';
import { MyAppointmentListDto } from '../appointments/MyAppointmentListDto';
import { MyProjectParticipationDto } from './MyProjectParticipationDto';

export interface MyProjectDto {
  project: ProjectDto;
  participations: MyProjectParticipationDto[];
  appointments: MyAppointmentListDto[];
}

