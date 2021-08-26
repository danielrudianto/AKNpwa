import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessagingService } from '../services/messaging.service';
import { AppUpdateService } from '../services/update.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(
    private router: Router,
    private update: AppUpdateService,
    private authService: AuthService,
    private messagingService: MessagingService
  ) {
  }

  ngOnInit(): void {
    
  }

  goToProfile() {
    this.router.navigate(['Profile']);
  }

}
