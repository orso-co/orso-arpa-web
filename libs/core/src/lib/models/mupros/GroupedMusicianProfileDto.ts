import { ReducedMusicianProfileDto } from './ReducedMusicianProfileDto';
import { ReducedPersonDto } from '../persons/ReducedPersonDto';

export interface GroupedMusicianProfileDto {
  person?: ReducedPersonDto;
  musicianProfiles?: Array<ReducedMusicianProfileDto>;
}
