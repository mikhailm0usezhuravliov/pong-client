import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardModule } from './components/smart/board/board.module';
import { EffectsModule } from '@ngrx/effects';
import { paddleReducer } from './state/paddle/paddle.reducer';
import { StoreModule } from '@ngrx/store';
import { PaddleEffects } from './state/paddle/paddle.effects';
import { gameReducer } from './state/game/game.reducer';
import { GameEffects } from './state/game/game.effects';
import { BallEffects } from './state/ball/ball.effects';
import { ballReducer } from './state/ball/ball.reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BoardModule,
    StoreModule.forRoot({
      paddles: paddleReducer,
      game: gameReducer,
      ball: ballReducer,
    }),
    EffectsModule.forRoot([PaddleEffects, GameEffects, BallEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
