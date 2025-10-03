import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { pencil } from 'ionicons/icons';
import { BankCardComponent } from 'src/app/shared/components/bank-card/bank-card.component';

@Component({
  selector: 'app-cards',
  templateUrl: 'cards.page.html',
  styleUrls: ['cards.page.scss'],
  imports: [IonicModule, CommonModule, BankCardComponent]
})
export class CardsPage {

  constructor() {
    addIcons({
      pencil
    });
  }

  cards = [
    {
      number: '9805 9840 7639 0957',
      exp: '05/28',
      type: 'gradient',
    },
    {
      number: '2379 8965 0985 0427',
      exp: '02/23',
      type: 'black',
    }
  ];

  transactions = [
    { title: 'Netflix', amount: -11.00, currency: '€', date: 'Today', icon: 'logo-netflix' },
    { title: 'Refill card', amount: 657.00, currency: '$', date: 'Thu 12, June', icon: 'card' }
  ];

}
