import { PersonDto } from '../persons/PersonDto';

export interface MyUserProfileDto {
  userName: string;
  email: string;
  person: PersonDto;
}
