import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { StateItem } from '../../models/table/state-item';
import { UserStatus } from '@arpa/core';

@Component({
  selector: 'arpa-status-badge',
  standalone: true,
  imports: [CommonModule, TagModule],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent implements OnInit {
  @Input()
  value: string | null | undefined = '';

  @Input()
  stateMap: StateItem[] | undefined;

  get label(): string {
    return this.getStateItem().label;
  }

  get severity(): string {
    return this.getStateItem().severity;
  }

  ngOnInit() {
    if (!this.stateMap) {
      this.stateMap = [
        {
          label: $localize`Active`,
          severity: 'success',
          value: UserStatus.ACTIVE,
        },
        {
          label: $localize`Awaiting e-mail confirmation`,
          severity: 'info',
          value: UserStatus.AWAITING_EMAIL_CONFIRMATION,
        },
        {
          label: $localize`Postponed`,
          severity: 'danger',
          value: 'postponed',
        },
        {
          label: $localize`Cancelled`,
          severity: 'warning',
          value: 'cancelled',
        },
        {
          label: $localize`Unknown`,
          severity: 'info',
          value: 'unknown',
        },
        {
          label: $localize`Archived`,
          severity: 'info',
          value: 'archived',
        },
        {
          label: $localize`Confirmed`,
          severity: 'success',
          value: 'confirmed',
        },
        {
          label: $localize`Awaiting Role Assignment`,
          severity: 'warning',
          value: UserStatus.AWAITING_ROLE_ASSIGNMENT,
        },
        {
          label: $localize`Concert`,
          severity: 'success',
          value: 'concert',
        },
        {
          label: $localize`Concert Tour`,
          severity: 'warning',
          value: 'concert_tour',
        },
        {
          label: $localize`Candidate`,
          severity: 'danger',
          value: 'candidate',
        },
        {
          label: $localize`Acceptance`,
          severity: 'success',
          value: 'acceptance',
        },
        {
          label: $localize`Refusal`,
          severity: 'danger',
          value: 'refusal',
        },
        {
          label: $localize`Scheduled`,
          severity: 'warning',
          value: 'scheduled',
        },
        {
          label: $localize`Rehearsals Only`,
          severity: 'info',
          value: 'rehearsals_only',
        },
      ];
    }
  }

  private getStateItem(): StateItem {
    const state = this.stateMap
      ? this.stateMap.find((item) => item.value === this.value)
      : undefined;
    return (
      state ?? {
        label: this.value!,
        severity: 'default',
        value: 'default',
      }
    );
  }
}
