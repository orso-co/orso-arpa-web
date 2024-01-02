import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, debounceTime } from 'rxjs';
import { LoadingService } from '../../services';

@Component({
  selector: 'arpa-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  @Input()
  loading = true;

  constructor() {}
}
