import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'arpa-avatar',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit {
  @Input() imageUrl?: string;
  @Input() label?: string;
  @Input() size: 'normal' | 'large' | 'xlarge' | undefined = 'large';

  initials?: string;

  ngOnInit(): void {
    if (!this.imageUrl && this.label) {
      this.renderInitials();
    }
  }

  renderInitials() {
    let label = '';
    const splitLabel = this.label?.split(' ');
    if (splitLabel?.length) {
      splitLabel.forEach((str) => {
        label += str[0].trim().toUpperCase();
      });
    }
    this.initials = label;
  }

  getColor() {
    const str = this.label || 'default';
    return `hsl(${this.hashStr(str) % 360}, 28%, 50%)`;
  }

  private hashStr(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      // eslint-disable-next-line no-bitwise
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
}
