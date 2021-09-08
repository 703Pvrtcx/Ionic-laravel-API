import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminDashboardPage } from './Pages/Admin/admin-dashboard/admin-dashboard.page';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./Pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () => import('./Pages/Product/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'create-user',
    loadChildren: () => import('./Pages/Admin/create-user/create-user.module').then( m => m.CreateUserPageModule)
  },
  {
    path: 'view-users',
    loadChildren: () => import('./Pages/Admin/view-users/view-users.module').then( m => m.ViewUsersPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./Pages/Admin/admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./Pages/Product/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/product/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./pages/product/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./Pages/Product/update/update.module').then( m => m.UpdatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
