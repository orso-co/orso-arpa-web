import { RoleNames } from '../../enums';

export interface DecodedToken {
  audience: string;
  issuer: string;
  expiryDate: Date;
  creationDate: Date;
  username: string;
  displayName: string;
  roles: RoleNames[];
  userId: string;
  personId?: string;
}
