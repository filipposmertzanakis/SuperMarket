import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeedProductsPage } from './seed-products.page';

const routes: Routes = [
  {
    path: '',
    component: SeedProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeedProductsPageRoutingModule {}
