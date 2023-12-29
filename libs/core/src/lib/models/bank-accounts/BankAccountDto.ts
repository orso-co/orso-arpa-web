import { SelectValueDto } from '../select/SelectValueDto';

export interface BankAccountDto {
  id: string;
  createdBy: string;
  createdAt?: Date;
  modifiedBy: string;
  modifiedAt?: Date;
  iban?: string;
  bic?: string;
  status?: SelectValueDto;
  commentInner?: string;
  accountOwner?: string;
}
