import { AddressDto } from '../addresses/AddressDto';
import { RoomDto } from '../rooms/RoomDto';

export interface VenueDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  name?: string;
  description?: string;
  addressId?: string;
  address?: AddressDto;
  rooms?: Array<RoomDto>;
}
