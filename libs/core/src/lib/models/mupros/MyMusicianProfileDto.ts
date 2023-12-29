import { MusicianProfileInquiryStatus } from '../../enums/mupros/MusicianProfileInquiryStatus';
import { CurriculumVitaeReferenceDto } from './CurriculumVitaeReferenceDto';
import { EducationDto } from './EducationDto';
import { MusicianProfileDeactivationDto } from './MusicianProfileDeactivationDto';
import { MyDoublingInstrumentDto } from './MyDoublingInstrumentDto';
import { RegionPreferenceDto } from '../regions/RegionPreferenceDto';
import { SectionDto } from '../sections/SectionDto';

export interface MyMusicianProfileDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  isMainProfile?: boolean;
  levelAssessmentInner?: number;
  profilePreferenceInner?: number;
  backgroundInner?: string;
  personId?: string;
  instrument?: SectionDto;
  inquiryStatusInner?: MusicianProfileInquiryStatus;
  doublingInstruments?: Array<MyDoublingInstrumentDto>;
  educations?: Array<EducationDto>;
  curriculumVitaeReferences?: Array<CurriculumVitaeReferenceDto>;
  preferredPositionsInnerIds?: Array<string>;
  preferredPartsInner?: Array<number>;
  documents?: Array<string>;
  deactivation?: MusicianProfileDeactivationDto;
  regionPreferencesRehearsal?: Array<RegionPreferenceDto>;
  regionPreferencesPerformance?: Array<RegionPreferenceDto>;
}
