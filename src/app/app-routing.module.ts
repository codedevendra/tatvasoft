import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { ViewFormComponent } from './view-form/view-form.component';

const routes: Routes = [
  { path: '', component: FormsComponent },
  { path: 'form-details', component: ViewFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
