import { ProjectStatus } from '../../enums/projects/ProjectStatus';
import { SelectValueDto } from '../select';
import { UrlDto } from '../urls/UrlDto';
import { ReducedProjectDto } from './ReducedProjectDto';

export interface ProjectDto {
  id: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  title: string;
  shortTitle?: string;
  description?: string;
  code?: string;
  type?: SelectValueDto;
  genre?: SelectValueDto;
  startDate?: Date;
  endDate?: Date;
  urls?: Array<UrlDto>;
  status?: ProjectStatus;
  parentId?: string;
  isCompleted?: boolean;
  parentProject?: string;
  children: ReducedProjectDto[];
}
