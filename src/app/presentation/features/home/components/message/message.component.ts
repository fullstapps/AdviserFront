import { Component, Input } from '@angular/core';
import { IMessage } from 'src/app/core/models/messages.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message: IMessage;
}
