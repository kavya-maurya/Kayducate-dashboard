import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './features/public/home/home';

import { About } from './features/public/about/about';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { UserLayout } from './layouts/user-layout/user-layout';



const routes: Routes = [
 


  

  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/public/public-module')
            .then(m => m.PublicModule)
      }
       
    ]
  },

  {
    path: 'auth',
    component: AuthLayout,
    loadChildren: () =>
      import('./features/auth/auth-module')
        .then(m => m.AuthModule)
  },

    

  {
    path: 'student',
    component: UserLayout,
    loadChildren: () =>
      import('./features/user/user-module')
        .then(m => m.UserModule)
  },

  {
    path: '**',
    redirectTo: ''
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
