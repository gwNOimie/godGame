import { Injectable, OnInit } from '@angular/core';
import * as Phaser from 'phaser-ce';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class PhaserService implements Phaser {
  public game: Phaser.Game;
  public fullyLoaded = new BehaviorSubject(false);

  constructor() {
    const preload = () => {
      this.game.load.image('cat', 'assets/images/cat.png');
    };

    const create = () => {
      this.game.stage.backgroundColor = '#e6e6e6';

      this.game.add.sprite(
        this.game.world.centerX - (this.game.cache.getImage('cat').width / 2),
        this.game.world.centerY - (this.game.cache.getImage('cat').height / 2),
        'cat'
      );
      this.fullyLoaded.next(true);
    };

    const update = () => {
    };

    this.game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'app-root', { preload: preload, create: create, update: update });
  }
}
