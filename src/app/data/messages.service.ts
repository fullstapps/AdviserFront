import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage } from '../core/models/messages.model';
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private _http: HttpClient) {}

  getMessages(): Observable<IMessage[]> {
    return this._http.get<IMessage[]>('messages/list');
  }

  requestMessages(): Observable<IMessage[]> {
    return this._http.get<IMessage[]>('messages/request');
  }
}
