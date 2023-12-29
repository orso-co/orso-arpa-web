import { AddressDto } from '../addresses/AddressDto';
import { ContactDetailDto } from '../contacts/ContactDetailDto';
import { ReducedPersonDto } from '../persons/ReducedPersonDto';
import { SectionDto } from '../sections/SectionDto';
import { MusicianProfileDto } from '../mupros/MusicianProfileDto';
import { SelectValueDto } from '../select/SelectValueDto';

export interface PerformerDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  givenName?: string;
  surname?: string;
  aboutMe?: string;
  contactVia?: ReducedPersonDto;
  contactsRecommended?: Array<ReducedPersonDto>;
  contactDetails?: Array<ContactDetailDto>;
  gender?: SelectValueDto;
  birthName?: string;
  dateOfBirth?: Date;
  birthplace?: string;
  experienceLevel?: number;
  reliability?: number;
  generalPreference?: number;
  addresses?: Array<AddressDto>;
  stakeholderGroups?: Array<SectionDto>;
  musicianProfiles?: Array<MusicianProfileDto>;
  instrumentId?: string;
  instrument?: SelectValueDto;
  qualification?: SelectValueDto;
}
