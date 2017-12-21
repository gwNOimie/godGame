import { DatabaseService } from './../../services/database/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDrones().then(data => {
      console.log(data);
    });
  }

}
