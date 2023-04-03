import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel[title][icon][budget]',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent  implements OnInit {

  @Input('title') title: string = 'Title'
  @Input('icon') icon: string = 'help-circle-outline'
  @Input('budget') budget: number = 550.25

  constructor() { }

  ngOnInit() {}

}
