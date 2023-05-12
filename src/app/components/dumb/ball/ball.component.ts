import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss'],
  standalone: true,
})
export class BallComponent {
  @Input() diameter: number;

  get getDiametr() {
    return `${this.diameter ? this.diameter :30}px`
  }

}
