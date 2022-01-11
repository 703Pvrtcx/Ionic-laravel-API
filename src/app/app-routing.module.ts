import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SmartPassPage } from './04_Pages/smart-pass/smart-pass.page';
import { AdminDashboardPage } from './Pages/Admin/admin-dashboard/admin-dashboard.page';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./Pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'welcome',
  //   pathMatch: 'full'
  // },
 
  // {
  //   path: '',
  //   redirectTo: 'user-login',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    loadChildren: () => import('./04_Pages/Account/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user-login',
    loadChildren: () => import('./04_Pages/Account/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user-signup',
    loadChildren: () => import('./04_Pages/Account/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./04_Pages/Account/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./04_Pages/Account/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./04_Pages/Account/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'smart-pass',
    loadChildren: () => import('./04_Pages/smart-pass/smart-pass.module').then( m => m.SmartPassPageModule)
  },
  {
    path: 'smart-pass',
    component: SmartPassPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./04_Pages/Account/profile/profile.module').then( m => m.ProfilePageModule)
      },
       {
        path: 'profile',
        loadChildren: () => import('./04_Pages/Account/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./04_Pages/Smart-Pass/manage-users/manage-users.module').then( m => m.ManageUsersPageModule)
      },
      {
        path: 'system',
        loadChildren: () => import('./04_Pages/Smart-Pass/manage-system/manage-system.module').then( m => m.ManageSystemPageModule)
      },
      {
        path: 'devices',
        loadChildren: () => import('./04_Pages/Smart-Pass/devices/devices.module').then( m => m.DevicesPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./04_Pages/Smart-Pass/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'requests',
        loadChildren: () => import('./04_Pages/Smart-Pass/request/request.module').then( m => m.RequestPageModule)
      },
    ]
  },
  {
    path: 'details',
    loadChildren: () => import('./04_Pages/Manage-User/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./04_Pages/Smart-Pass/request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'make-state',
    loadChildren: () => import('./06_System/make-state/make-state.module').then( m => m.MakeStatePageModule)
  },
  {
    path: 'edit-state/:id',
    loadChildren: () => import('./06_System/edit-state/edit-state.module').then( m => m.EditStatePageModule)
  },
  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
