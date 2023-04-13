import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from 'src/app/core/models/auth.models';
import { IMessage } from 'src/app/core/models/messages.model';
import { AuthService } from 'src/app/data/auth.service';
import { MessagesService } from 'src/app/data/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  profile$: Observable<IProfile>;
  messages$: Observable<IMessage[]>;
  isLoadingRequest: boolean;
  constructor(
    private _authService: AuthService,
    private _messagesService: MessagesService
  ) {
    this.profile$ = this._authService.getProfile();
    this.messages$ = this._messagesService.getMessages();
    this.messages$.subscribe((res) => {
      if (res) {
        this._scrollDownBox();
      }
    });
  }

  ngOnInit() {}

  onUpdateProfile(data) {
    this._authService.updateProfile(data).subscribe((res) => {
      this.profile$ = this._authService.getProfile();
      this.messages$ = this._messagesService.getMessages();
    });
  }

  onRequestMessage() {
    this.isLoadingRequest = true;
    this._messagesService.requestMessages().subscribe((res) => {
      this.isLoadingRequest = false;
      this.messages$ = this._messagesService.getMessages();
    });
  }
  private _scrollDownBox() {
    setTimeout(() => {
      const objDiv = document.getElementById('box');
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 500);
  }
}
