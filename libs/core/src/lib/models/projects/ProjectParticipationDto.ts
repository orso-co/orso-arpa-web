import { ProjectParticipationStatusInner } from '../../enums/projects/ProjectParticipationStatusInner';
import { ProjectInvitationStatus } from '../../enums/projects/ProjectInvitationStatus';
import { ReducedMusicianProfileDto } from '../mupros/ReducedMusicianProfileDto';
import { ReducedPersonDto } from '../persons/ReducedPersonDto';
import { ReducedProjectDto } from './ReducedProjectDto';
import { ProjectParticipationStatusInternal, ProjectParticipationStatusResult } from '../../enums';

export interface ProjectParticipationDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  participationStatusInner?: ProjectParticipationStatusInner;
  participationStatusInternal?: ProjectParticipationStatusInternal;
  participationStatusResult?: ProjectParticipationStatusResult;
  invitationStatus?: ProjectInvitationStatus;
  commentByPerformerInner?: string;
  commentByStaffInner?: string;
  commentTeam?: string;
  musicianProfile?: ReducedMusicianProfileDto;
  project?: ReducedProjectDto;
  parentProject?: ReducedProjectDto;
  person?: ReducedPersonDto;
  children?: ReducedProjectDto[];
}
