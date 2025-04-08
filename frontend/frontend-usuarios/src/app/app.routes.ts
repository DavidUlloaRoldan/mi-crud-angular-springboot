import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';

export const routes: Routes = [
  { path: 'usuarios', component: UsuarioComponent },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
];
