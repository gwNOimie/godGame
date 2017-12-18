import { PixiService } from './../../services/pixi/pixi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: ''
})
export class HomeComponent implements OnInit {

  constructor(private pixi: PixiService) { }

  ngOnInit() {
    this.pixi.createSprite('cat', '../../assets/images/cat.png');
  }

}
