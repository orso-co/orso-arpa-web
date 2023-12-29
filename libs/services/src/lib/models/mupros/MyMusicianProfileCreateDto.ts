import { MusicianProfileInquiryStatus } from '@arpa/core';
import { MyDoublingInstrumentCreateBodyDto } from './MyDoublingInstrumentCreateBodyDto';

export interface MyMusicianProfileCreateDto {
  levelAssessmentInner?: number;
  instrumentId: string;
  inquiryStatusInner?: MusicianProfileInquiryStatus;
  doublingInstruments: Array<MyDoublingInstrumentCreateBodyDto>;
  preferredPositionsInnerIds: Array<string>;
  preferredPartsInner: Array<number>;
}
