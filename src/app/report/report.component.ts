import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(
    private route: Router,
    private router: ActivatedRoute
  ){ }

  ngOnInit(): void {
  }

  backToProject() {
    this.route.navigate(["/Project/Feed"]);
  }
}
