import { AppointmentParticipationDto } from './AppointmentParticipationDto';
import { ReducedMusicianProfileDto } from '../mupros/ReducedMusicianProfileDto';
import { ReducedPersonDto } from '../persons/ReducedPersonDto';

export interface AppointmentParticipationListItemDto {
  person?: ReducedPersonDto;
  participation?: AppointmentParticipationDto;
  musicianProfiles?: Array<ReducedMusicianProfileDto>;
}
