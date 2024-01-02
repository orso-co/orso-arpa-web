import {
  ProjectParticipationStatusInternal,
  ProjectParticipationStatusResult,
} from '../../enums';
import { ReducedMusicianProfileDto } from '../mupros/ReducedMusicianProfileDto';
import { ProjectParticipationStatusInner } from '../../enums/projects/ProjectParticipationStatusInner';
import { MyAppointmentListDto } from '../appointments/MyAppointmentListDto';

export interface MyProjectParticipationDto {
  participationStatusInner?: ProjectParticipationStatusInner;
  participationStatusInternal?: ProjectParticipationStatusInternal;
  participationStatusResult?: ProjectParticipationStatusResult;
  commentByPerformerInner?: string;
  commentByStaffInner?: string;
  musicianProfile: ReducedMusicianProfileDto;
  myAppointments: MyAppointmentListDto;
}
