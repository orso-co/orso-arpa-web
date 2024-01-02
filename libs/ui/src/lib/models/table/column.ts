import { StateItem } from './state-item';

export interface ColumnDefinition<T> {
  label: string;
  property: string | Extract<keyof T, string>;
  type:
    | 'text'
    | 'date'
    | 'image'
    | 'badge'
    | 'state'
    | 'progress'
    | 'checkbox'
    | 'button'
    | 'template'
    | 'rating'
    | 'number';
  show?: boolean;
  cssClasses?: string[];
  template?: string;
  hideFilter?: boolean;
  badgeStateMap?: StateItem[];
  // Required for type "state" because it's dynamically resolved.
  stateTable?: string;
  stateProperty?: string;
}
