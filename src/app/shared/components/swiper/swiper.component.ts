import { Component, Input, AfterViewInit, ViewChild, ElementRef, ContentChildren, QueryList, TemplateRef, ContentChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Swiper imports
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';

register();

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwiperComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  // Inputهای اصلی برای تنظیمات Swiper
  @Input() items: any[] = [];
  @Input() slidesPerView: number = 1.2;
  @Input() spaceBetween: number = 10;
  @Input() centeredSlides: boolean = true;
  @Input() pagination: boolean = true;
  @Input() paginationType: 'bullets' | 'progressbar' | 'fraction' | 'custom' = 'bullets';
  @Input() navigation: boolean = true;
  @Input() loop: boolean = false;
  @Input() autoplay: boolean = false;
  @Input() autoplayDelay: number = 3000;
  @Input() slideClass: string = 'swiper-slide-custom';

  // TemplateRef برای محتوای سفارشی
  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;

  // متغیر برای ردیابی اسلاید فعال
  activeSlideIndex: number = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.initSwiper();
    }, 100);
  }

  private initSwiper() {
    const swiperParams: SwiperOptions = {
      slidesPerView: this.slidesPerView,
      spaceBetween: this.spaceBetween,
      centeredSlides: this.centeredSlides,
      pagination: this.pagination ? {
        clickable: true,
        type: this.paginationType,
        dynamicBullets: this.paginationType === 'bullets',
      } : false,
      navigation: this.navigation,
      loop: this.loop,
      autoplay: this.autoplay ? {
        delay: this.autoplayDelay,
        disableOnInteraction: false,
      } : false,
      on: {
        slideChange: (swiper) => {
          this.activeSlideIndex = swiper.activeIndex;
        },
        init: (swiper) => {
          this.activeSlideIndex = swiper.activeIndex;
        }
      },
      breakpoints: {
        320: { slidesPerView: 1.1, spaceBetween: 8 },
        480: { slidesPerView: 1.3, spaceBetween: 10 },
        640: { slidesPerView: 1.8, spaceBetween: 15 },
        768: { slidesPerView: 2.2, spaceBetween: 20 },
        1024: { slidesPerView: 2.8, spaceBetween: 25 },
        1200: { slidesPerView: 3.2, spaceBetween: 30 }
      }
    };

    Object.assign(this.swiperContainer.nativeElement, swiperParams);
    this.swiperContainer.nativeElement.initialize();
  }

  // متد برای بررسی اسلاید فعال
  isActive(index: number): boolean {
    return index === this.activeSlideIndex;
  }

  // متد برای رفتن به اسلاید خاص
  slideTo(index: number): void {
    if (this.swiperContainer?.nativeElement?.swiper) {
      this.swiperContainer.nativeElement.swiper.slideTo(index);
    }
  }

  // متدهای کنترل Swiper
  slideNext(): void {
    if (this.swiperContainer?.nativeElement?.swiper) {
      this.swiperContainer.nativeElement.swiper.slideNext();
    }
  }

  slidePrev(): void {
    if (this.swiperContainer?.nativeElement?.swiper) {
      this.swiperContainer.nativeElement.swiper.slidePrev();
    }
  }
}