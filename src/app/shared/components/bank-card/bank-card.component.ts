import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { wifiOutline } from 'ionicons/icons';

@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.scss'],
  imports: [IonicModule],
  standalone: true
})
export class BankCardComponent implements OnInit {

  @Input() bankName: string = 'My Bank';
  @Input() cardNumber: string = '4123 4567 8901 2345';
  @Input() holderName: string = 'MEHRDAD SOHRABI';
  @Input() expiry: string = '12/29';
  @Input() brand: string = 'EX';

  constructor() {
    addIcons({
      wifiOutline
    })
  }

  ngOnInit() { }

}
