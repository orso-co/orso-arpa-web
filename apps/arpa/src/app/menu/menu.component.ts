import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { RoleNames, SessionService } from '@arpa/core';
import { BehaviorSubject } from 'rxjs';
import _ from 'lodash';

interface ArpaMenuItem extends MenuItem {
  roles?: RoleNames[];
  items?: ArpaMenuItem[];
}

@Component({
  selector: 'arpa-menu',
  standalone: true,
  imports: [CommonModule, MenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  @Input() menu: ArpaMenuItem[] = [
    {
      label: $localize`Dashboard`,
      icon: 'pi pi home',
      items: [
        {
          label: $localize`Dashboard`,
          icon: 'pi pi-home',
          routerLink: 'dashboard',
        },
      ],
    },
    {
      label: $localize`General`,
      items: [
        {
          label: $localize`News`,
          icon: 'pi pi-bell',
          routerLink: 'news',
          roles: [RoleNames.staff],
        },
        {
          label: $localize`Projects`,
          icon: 'pi pi-th-large',
          routerLink: 'projects',
          roles: [RoleNames.staff],
        },
        {
          label: $localize`Calendar`,
          icon: 'pi pi-calendar',
          roles: [RoleNames.staff],
          routerLink: 'calendar',
        },
        {
          label: $localize`Users`,
          icon: 'pi pi-users',
          roles: [RoleNames.admin],
          routerLink: 'users',
        },
        {
          label: $localize`Persons`,
          icon: 'pi pi-users',
          roles: [RoleNames.staff],
          routerLink: 'persons',
        },
        {
          label: $localize`Performers`,
          icon: 'pi pi-users',
          roles: [RoleNames.staff],
          routerLink: 'performer',
        },
        {
          icon: 'pi pi-clone',
          label: $localize`Musician Profiles`,
          roles: [RoleNames.staff],
          routerLink: 'mupro',
        },
        {
          icon: 'pi pi-map-marker',
          label: $localize`Locations`,
          roles: [RoleNames.staff],
          routerLink: 'venues',
        },
        {
          icon: 'pi pi-info-circle',
          label: $localize`Audit Logs`,
          roles: [RoleNames.staff],
          routerLink: 'auditlogs',
        },
      ],
    },

    {
      label: $localize`Personal`,
      items: [
        {
          label: $localize`My Information`,
          icon: 'pi pi-user-edit',
          roles: [RoleNames.performer, RoleNames.staff, RoleNames.admin],
          routerLink: 'profile/my-data',
        },
        {
          label: $localize`My Projects`,
          icon: 'pi pi-th-large',
          roles: [RoleNames.performer],
          routerLink: 'profile/my-projects',
        },
        {
          label: $localize`My Appointments`,
          icon: 'pi pi-calendar',
          roles: [RoleNames.performer, RoleNames.staff],
          routerLink: 'profile/my-appointments',
        },
        {
          label: $localize`My Musician Profiles`,
          icon: 'pi pi-user-edit',
          roles: [RoleNames.performer],
          routerLink: 'profile/musicianprofile',
        },
        {
          label: $localize`Support`,
          icon: 'pi pi-send',
          roles: [RoleNames.performer],
          command: () => this.sendEmail(),
        },
      ],
    },
  ];

  items = new BehaviorSubject<MenuItem[]>([]);

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.userChanged().subscribe((user) => {
      this.initMenu(
        user?.roles || [RoleNames.admin, RoleNames.staff, RoleNames.performer]
      );
    });
  }

  initMenu(roles: RoleNames[]) {
    this.items.next([]);
    const filteredMenu = this.menu.filter((item) =>
      this.filterItem(item, roles)
    );
    console.log({ filteredMenu });
    filteredMenu.forEach((item) => {
      item.items = (item.items || []).filter((childItem) =>
        this.filterItem(childItem, roles)
      );
    });

    this.items.next(
      filteredMenu.filter((menu) => (menu.items ? !!menu.items.length : true))
    );
  }

  filterItem(item: ArpaMenuItem, roles: RoleNames[]): boolean {
    console.log('filterItems');
    console.log({ item });
    return item.roles ? _.intersection(roles, item.roles).length > 0 : true;
  }

  sendEmail() {
    window.location.href = 'mailto:support@arpa.orso.co';
  }
}
