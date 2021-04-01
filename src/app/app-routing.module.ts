import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMajorComponent } from './components/major/add-major/add-major.component';

const routes: Routes = [
  { path: 'addMajor', component: AddMajorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
