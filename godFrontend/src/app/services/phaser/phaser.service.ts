import { Injectable, OnInit } from '@angular/core';
import * as Phaser from 'phaser-ce';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PhaserService extends Phaser implements OnInit {
  public game: Phaser.Game;
  private fullyLoaded = false;
  public isFullyLoaded;

  constructor() {
    super();
  }

  ngOnInit() {
    this.game = new Phaser.Game('100%', '100%', Phaser.AUTO, this, { preload: this.preload, create: this.create, update: this.update });
    this.isFullyLoaded = Observable.of(this.fullyLoaded);
    console.log(this.isFullyLoaded);
  }

  private preload() {
    this.game.load.image('cat', 'assets/images/cat.png');
  }

  private create() {
    this.game.stage.backgroundColor = '#e6e6e6';

    this.game.add.sprite(
      this.game.world.centerX - (this.game.cache.getImage('cat').width / 2),
      this.game.world.centerY - (this.game.cache.getImage('cat').height / 2),
      'cat'
    );
    this.fullyLoaded = true;
    console.log(this);
    console.log(this.fullyLoaded);
    console.log(this.isFullyLoaded);
  }

  private update() {
  }

}
