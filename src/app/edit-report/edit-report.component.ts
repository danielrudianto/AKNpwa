import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedService } from '../services/feed.service';
import { ProjectService } from '../services/project.service';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit {
  report: any = null;

  constructor(
    private route: ActivatedRoute,
    private feedService: FeedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.feedService.getFeed(this.route.snapshot.params.id).subscribe(data => {
      if (data == null) {
        this.router.navigate(['/']);
      } else {
        this.report = data;
        console.log(data);
      }
    })
  }

  backToProject() {
    this.router.navigate(["/Project/Feed"]);
  }

}
