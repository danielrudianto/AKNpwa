import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private authService: AuthService
  ) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: any) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }


  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token: any) => {
        this.authService.sendToken(token).subscribe(data => {
          console.log('Token already sent');
        })
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  deleteToken() {
    this.angularFireMessaging.getToken.subscribe(
      (token: any) => {
        this.authService.sendDeleteToken(token).subscribe(data => {
          console.log("Token deleted");
        })
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload: any) => {
        console.log("new message received. ", payload);
      })
  }
}
