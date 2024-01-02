import {
  ProjectInvitationStatus,
  ProjectParticipationStatusInner,
  ProjectParticipationStatusInternal,
} from '@arpa/core';

export interface SetProjectParticipationBodyDto {
  participationStatusInner?: ProjectParticipationStatusInner;
  participationStatusInternal: ProjectParticipationStatusInternal;
  invitationStatus: ProjectInvitationStatus;
  commentByStaffInner?: string;
  commentTeam?: string;
  musicianProfileId: string;
}
