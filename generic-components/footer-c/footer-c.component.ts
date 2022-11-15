import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-c',
  templateUrl: './footer-c.component.html',
  styleUrls: ['./footer-c.component.css']
})
export class FooterCComponent implements OnInit {

  nomeCreator: string = "Andrea Doddis";

  constructor() { }

  ngOnInit(): void {
  }

}
