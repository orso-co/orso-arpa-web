import { ProjectParticipationStatusInner } from '@arpa/core';

export interface MyProjectParticipationModifyBodyDto {
  participationStatusInner: ProjectParticipationStatusInner;
  commentByPerformerInner?: string;
  musicianProfileId: string;
}
