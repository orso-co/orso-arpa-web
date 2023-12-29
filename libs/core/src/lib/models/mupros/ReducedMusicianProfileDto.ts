import { MusicianProfileDeactivationDto } from './MusicianProfileDeactivationDto';
import { PersonDto } from '../persons/PersonDto';

export interface ReducedMusicianProfileDto {
  id?: string;
  instrumentName?: string;
  instrument?: any;
  qualification?: string;
  doublingInstrumentNames?: string[];
  deactivation?: MusicianProfileDeactivationDto;
  person?: PersonDto;
}
