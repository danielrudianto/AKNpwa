import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as global from '../global';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  global: any = global;

  constructor(
    private authService: AuthService,
    private route: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.fetchProfile();

    this.socketService.socket.on("updateToken", (data: any) => {
      if (data.Email == this.authService.getEmail()) {
        this.authService.updateToken(data.Token);
        this.fetchProfile();
      }
    })
  }

  fetchProfile() {
    this.authService.getProfile().subscribe((responseData: User) => {
      this.user = responseData;
    })
  }

  backToMain() {
    this.route.navigate(["/"]);
  }

  uploadProfilePicture(event: any) {
    this.userService.updateProfilePicture(event.target.files[0]).subscribe(data => {
    }, error => {
      this.snackBar.open(error.message, "Close");
    });;
  }

}
