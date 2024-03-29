import { MusicianProfileInquiryStatus } from '../../enums/mupros/MusicianProfileInquiryStatus';
import { CurriculumVitaeReferenceDto } from './CurriculumVitaeReferenceDto';
import { DoublingInstrumentDto } from './DoublingInstrumentDto';
import { EducationDto } from './EducationDto';
import { MusicianProfileDeactivationDto } from './MusicianProfileDeactivationDto';
import { RegionPreferenceDto } from '../regions/RegionPreferenceDto';
import { SectionDto } from '../sections/SectionDto';
import { SelectValueDto } from '../select';

export interface MusicianProfileDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  isMainProfile?: boolean;
  levelAssessmentInner?: number;
  levelAssessmentTeam?: number;
  profilePreferenceInner?: number;
  profilePreferenceTeam?: number;
  backgroundInner?: string;
  backgroundTeam?: string;
  salaryComment?: string;
  personId?: string;
  instrument?: SectionDto;
  qualificationId?: string;
  salaryId?: string;
  inquiryStatusInner?: MusicianProfileInquiryStatus;
  inquiryStatusTeam?: MusicianProfileInquiryStatus;
  doublingInstruments?: Array<DoublingInstrumentDto>;
  educations?: Array<EducationDto>;
  curriculumVitaeReferences?: Array<CurriculumVitaeReferenceDto>;
  preferredPositionsInnerIds?: Array<string>;
  preferredPositionsTeamIds?: Array<string>;
  preferredPartsInner: Array<number>;
  preferredPartsTeam?: Array<number>;
  documents?: Array<SelectValueDto>;
  deactivation?: MusicianProfileDeactivationDto;
  regionPreferencesRehearsal?: Array<RegionPreferenceDto>;
  regionPreferencesPerformance?: Array<RegionPreferenceDto>;
  sectionName: string;
  qualification: string;
}
