import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminDashboardPage } from './Pages/Admin/admin-dashboard/admin-dashboard.page';
import { UpdateInfoPage } from './Pages/User/update-info/update-info.page';
import { UserDashboardPage } from './Pages/User/user-dashboard/user-dashboard.page';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./Pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: '',
    redirectTo: 'products',
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
    //User interface
    path: 'user', component: UserDashboardPage, children: [
      {
          path: '',
          redirectTo: '',
          pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () => import('./Pages/User/user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('./Pages/User/user-dashboard/user-signup/user-signup.component').then( m => m.UserSignupComponent)
      },
      {
        path: 'signin',
        loadChildren: () => import('./Pages/User/user-dashboard/user-signin/user-signin.component').then( m => m.UserSigninComponent)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('./Pages/User/user-dashboard/user-profile/user-profile.component').then( m => m.UserProfileComponent)
      },
    ]
  },
  {
    //Admin interface
    path: 'admin', component: AdminDashboardPage, children: [
      {
          path: '',
          redirectTo: '',
          pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () => import('./Pages/Admin/admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
      },
    ]
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
    path: 'update-info',
    loadChildren: () => import('./Pages/User/update-info/update-info.module').then( m => m.UpdateInfoPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./Pages/Admin/admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./Pages/User/user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./Pages/Product/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./pages/product/detail/detail.module').then( m => m.DetailPageModule)
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
