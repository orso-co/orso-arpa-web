import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TitleService } from '@arpa/ui';

@Component({
  selector: 'arpa-dashboard',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitle($localize`Dashboard`);
  }
}
