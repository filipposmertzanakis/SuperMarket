import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
{
  path: 'product-detail/:id',
  loadChildren: () =>
    import('./pages/product-detail/product-detail.module').then(
      (m) => m.ProductDetailPageModule
    ),
},
  {
    path: 'product-list',
    loadChildren: () => import('./pages/product-list/product-list.module').then( m => m.ProductListPageModule)
  },
  {
  path: 'seed-products',
  loadChildren: () => import('./pages/seed-products/seed-products.module').then(m => m.SeedProductsPageModule)
  },
  {
    path: 'seed-products',
    loadChildren: () => import('./pages/seed-products/seed-products.module').then( m => m.SeedProductsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
