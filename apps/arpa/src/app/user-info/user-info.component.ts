import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '@arpa/ui';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { MyUserProfileDto, SessionService, UserDto } from '@arpa/core';

@Component({
  selector: 'arpa-user-info',
  standalone: true,
  imports: [CommonModule, AvatarComponent, MenuModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent implements OnInit {
  user: MyUserProfileDto | null = null

  constructor(private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.sessionService.userChanged().subscribe(user => {
      console.log('user =>', user)
      this.user = user;
    })
  }

  items: MenuItem[] = [
    {
      title: 'something',
      label: 'something',
      icon: 'pi pi-times',
      styleClass: 'my-class',
      badgeStyleClass: 'my-class',
      command: this.logoutUser.bind(this)
    },
  ];

  logoutUser() {
    console.log('user log out')
    return this.sessionService.logout().subscribe()
  }
}
