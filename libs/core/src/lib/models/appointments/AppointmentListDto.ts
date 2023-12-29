import { AppointmentStatus } from '../../enums/appointments/AppointmentStatus';
import { SectionsAllDto } from '../sections/SectionsAllDto';
export interface AppointmentListDto {
  id: string;
  startTime: Date;
  endTime: Date;
  name: string;
  status?: AppointmentStatus;
  sections: Array<SectionsAllDto>;
}
