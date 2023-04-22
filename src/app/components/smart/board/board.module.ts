import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BallComponent } from '../../dumb/ball/ball.component';
import { PaddleComponent } from '../../dumb/paddle/paddle.component';
import { BoardComponent } from './board.component';

import { MatButtonModule } from '@angular/material/button';
import { PlayerNameInputModule } from '../player-name-input/player-name-input.module';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    BallComponent,
    PaddleComponent,
    MatButtonModule,
    PlayerNameInputModule,
    MatIconModule
  ],
  exports: [BoardComponent],
})
export class BoardModule {}
