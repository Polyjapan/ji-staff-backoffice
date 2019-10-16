import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JIStaffBackoffice';

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
