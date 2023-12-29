import { ContactDetailKey } from '@arpa/core';

export interface ContactDetailModifyBodyDto {
  key: ContactDetailKey;
  value: string;
  typeId?: string;
  commentTeam?: string;
  preference?: number;
}
