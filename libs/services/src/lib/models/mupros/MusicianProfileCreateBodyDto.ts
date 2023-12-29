import { MusicianProfileInquiryStatus } from '@arpa/core';
import { DoublingInstrumentCreateBodyDto } from './DoublingInstrumentCreateBodyDto';

export interface MusicianProfileCreateBodyDto {
  levelAssessmentInner?: number;
  levelAssessmentTeam?: number;
  instrumentId: string;
  qualificationId: string;
  inquiryStatusInner?: MusicianProfileInquiryStatus;
  inquiryStatusTeam?: MusicianProfileInquiryStatus;
  doublingInstruments: Array<DoublingInstrumentCreateBodyDto>;
  preferredPositionsInnerIds: Array<string>;
  preferredPositionsTeamIds: Array<string>;
  preferredPartsInner: Array<number>;
  preferredPartsTeam: Array<number>;
}
