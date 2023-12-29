import { ContactDetailKey } from '@arpa/core';

export interface MyContactDetailCreateDto {
  key: ContactDetailKey;
  value: string;
  typeId?: string;
  commentInner?: string;
  preference?: number;
}
