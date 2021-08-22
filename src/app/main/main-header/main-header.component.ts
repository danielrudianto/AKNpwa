import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as global from '../../global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  name: string = "";
  position: string = "";
  imageUrl: any = null;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.name = this.authService.getInfo().Name;
    this.position = this.authService.getInfo().Position;
    this.imageUrl = (this.authService.getInfo().ImageUrl != null)? global.url + "/img/" + this.authService.getInfo().ImageUrl : null;
  }

  goToProfile() {
    this.router.navigate(["/Profile"]);
  }

}
