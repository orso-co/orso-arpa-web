import { AppointmentStatus } from '@arpa/core';

export interface AppointmentModifyBodyDto {
  id: string;
  categoryId?: string;
  startTime: Date;
  endTime: Date;
  name: string;
  publicDetails?: string;
  internalDetails?: string;
  status?: AppointmentStatus;
  salaryId?: string;
  salaryPatternId?: string;
  expectationId?: string;
}
