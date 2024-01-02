import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent, LoadingService, TitleService } from '@arpa/ui';
import { Subscription, debounceTime } from 'rxjs';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from '../menu/menu.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'arpa-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingComponent,
    SharedModule,
    ToolbarModule,
    AvatarModule,
    PanelModule,
    MenubarModule,
    ButtonModule,
    MenuComponent,
    UserInfoComponent,
    ScrollPanelModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
  private loadingSubscription: Subscription | undefined;
  loading = false;
  title = this.titleService.getTitle();
  showMenu = false;

  constructor(
    private titleService: TitleService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loading$
      .pipe(debounceTime(0))
      .subscribe((val) => {
        this.loading = val;
      });
  }

  toggleMenu() {
    console.log('toggleMenu');
    this.showMenu = !this.showMenu;
    console.log('menu =>', this.showMenu);
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
