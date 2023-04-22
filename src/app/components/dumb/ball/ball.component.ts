import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss'],
  standalone: true,
})
export class BallComponent {
  @Input() diametr: number;

  get getDiametr() {
    return `${this.diametr ? this.diametr :30}px`
  }

}
