import { SectionDto } from './SectionDto';

export interface SectionTreeDto {
  data?: SectionDto;
  children?: Array<SectionTreeDto>;
  isRoot?: boolean;
  isLeaf?: boolean;
  level?: number;
}
