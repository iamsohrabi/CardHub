import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { pencil } from 'ionicons/icons';
import { BankCardComponent } from 'src/app/shared/components/bank-card/bank-card.component';
import { SwiperComponent } from 'src/app/shared/components/swiper/swiper.component';
import { AreaChartComponent } from 'src/app/shared/components/area-chart/area-chart.component';

@Component({
  selector: 'app-cards',
  templateUrl: 'cards.page.html',
  styleUrls: ['cards.page.scss'],
  imports: [IonicModule, CommonModule,
    BankCardComponent, SwiperComponent, AreaChartComponent]
})
export class CardsPage {

  constructor() {
    addIcons({
      pencil
    });
  }

  cards = [{
    bankName: "ملی",
    cardNumber: "6037 9911 2345 6789",
    holderName: "MEHRDAD SOHRABI",
    expiry: "07/30",
    brand: "IR"
  }, {
    bankName: "تجارت",
    cardNumber: "6037 9911 2345 6789",
    holderName: "MEHRDAD SOHRABI",
    expiry: "07/30",
    brand: "IR"
  }];

}
