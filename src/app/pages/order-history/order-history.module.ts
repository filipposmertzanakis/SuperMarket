import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderHistoryPageRoutingModule } from './order-history-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { OrderHistoryPage } from './order-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    OrderHistoryPageRoutingModule
  ],
  declarations: [OrderHistoryPage]
})
export class OrderHistoryPageModule {}
