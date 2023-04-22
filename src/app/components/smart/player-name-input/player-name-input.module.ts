import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerNameInputComponent } from './player-name-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoreboardComponent } from '../../dumb/scoreboard/scoreboard.component';
@NgModule({
  declarations: [PlayerNameInputComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ScoreboardComponent,
    ReactiveFormsModule
  ],
  exports: [PlayerNameInputComponent],
})
export class PlayerNameInputModule {}
