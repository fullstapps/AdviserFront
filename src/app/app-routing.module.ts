import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './core/guards/logged.guard';
import { UnloggedGuard } from './core/guards/unlogged.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoggedGuard],
    loadChildren: () =>
      import('./presentation/features/home/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {
    path: 'auth',
    canActivate: [UnloggedGuard],
    loadChildren: () =>
      import('./presentation/features/auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
