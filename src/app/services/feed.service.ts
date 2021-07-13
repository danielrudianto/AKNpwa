import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from '../global';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private http: HttpClient
  ) { }

  getFeeds(projectId: number, offset: number, limit: number = 10) {
    return this.http.get<any[]>(global.url + "/reportFeed/" + projectId.toString(), {
      params: {
        offset: offset,
        limit: limit
      }
    })
  }

  getFeed(feedId: number) {
    return this.http.get<any>(global.url + "/reportFeed/getById/" + feedId.toString());
  }
}
