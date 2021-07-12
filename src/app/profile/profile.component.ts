import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as global from '../global';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((responseData: User) => {
      this.user = responseData;
    })
  }

  backToMain() {
    this.route.navigate(["/"]);
  }

}
