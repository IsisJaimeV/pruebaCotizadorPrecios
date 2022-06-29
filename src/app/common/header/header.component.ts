import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from 'src/app/views/dashboard/dashboard.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any = "";
  constructor(private dashboard: DashboardComponent) { }

  ngOnInit(): void {
    this.user = this.dashboard.authUser();
  }

}
