import { MyAppointmentDto } from './MyAppointmentDto';

export interface MyAppointmentListDto {
  userAppointments?: Array<MyAppointmentDto>;
  totalRecordsCount?: number;
}
