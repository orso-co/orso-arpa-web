import { ContactDetailKey } from '@arpa/core';

export interface MyContactDetailModifyBodyDto {
  key: ContactDetailKey;
  value: string;
  typeId?: string;
  commentInner?: string;
  preference?: number;
}
