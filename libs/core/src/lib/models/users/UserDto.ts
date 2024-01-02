import { UserStatus } from '../../enums';
import { SectionDto } from '../sections/SectionDto';

export interface UserDto {
  id?: string;
  userName?: string;
  roleNames?: Array<string>;
  displayName?: string;
  email?: string;
  emailConfirmed?: boolean;
  createdAt?: Date;
  stakeholderGroups?: SectionDto[];
  status?: UserStatus;
  personId?: string;
}
