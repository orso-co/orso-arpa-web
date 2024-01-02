import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TitleService } from '@arpa/ui';

@Component({
  selector: 'arpa-persons',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.scss',
})
export class PersonsComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitle($localize`Persons`);
  }
}
