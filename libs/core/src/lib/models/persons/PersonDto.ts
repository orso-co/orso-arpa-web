import { AddressDto } from '../addresses/AddressDto';
import { BankAccountDto } from '../bank-accounts/BankAccountDto';
import { ContactDetailDto } from '../contacts/ContactDetailDto';
import { ReducedPersonDto } from './ReducedPersonDto';
import { SectionDto } from '../sections/SectionDto';
import { MusicianProfileDto } from '../mupros/MusicianProfileDto';
import { UserDto } from '../users/UserDto';
import { SelectValueDto } from '../select/SelectValueDto';

export interface PersonDto {
  id: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  givenName?: string;
  surname?: string;
  aboutMe?: string;
  personBackgroundTeam?: string;
  contactVia?: ReducedPersonDto;
  contactsRecommended?: Array<ReducedPersonDto>;
  bankAccounts?: Array<BankAccountDto>;
  contactDetails?: Array<ContactDetailDto>;
  musicianProfiles?: Array<MusicianProfileDto>;
  gender?: SelectValueDto;
  birthName?: string;
  dateOfBirth?: Date;
  birthplace?: string;
  experienceLevel?: number;
  reliability?: number;
  generalPreference?: number;
  addresses?: Array<AddressDto>;
  stakeholderGroups?: Array<SectionDto>;
  user?: UserDto;
}
