import { RegionPreferenceType } from '@arpa/core';

export interface MyRegionPreferenceCreateBodyDto {
  rating?: number;
  regionId: string;
  comment?: string;
  type: RegionPreferenceType;
}
