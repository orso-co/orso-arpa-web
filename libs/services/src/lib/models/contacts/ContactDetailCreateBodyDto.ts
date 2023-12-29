import { ContactDetailKey } from '@arpa/core';

export interface ContactDetailCreateBodyDto {
  key: ContactDetailKey;
  value: string;
  typeId?: string;
  commentTeam?: string;
  preference: number;
}
