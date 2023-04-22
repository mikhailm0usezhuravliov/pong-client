import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  standalone: true
})
export class ScoreboardComponent {
  @Input() scoreL: number;
  @Input() scoreR: number;
}
