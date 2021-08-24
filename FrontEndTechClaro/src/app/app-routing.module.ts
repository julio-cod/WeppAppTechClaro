import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatebookComponent } from './book/createbook/createbook.component';
import { DeletebookComponent } from './book/deletebook/deletebook.component';
import { EditbookComponent } from './book/editbook/editbook.component';
import { ListbookComponent } from './book/listbook/listbook.component';
import { VerdetallebookComponent } from './book/verdetallebook/verdetallebook.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'home',
    component:HomeComponent
  }
  ,
  {
    path:'listbook',
    component:ListbookComponent
  }
  ,
  {
    path:'createbook',
    component:CreatebookComponent
  }
  ,
  {
    path:'editbook/:idBook',
    component:EditbookComponent
  }
  ,
  {
    path:'deletebook/:idBook',
    component:DeletebookComponent
  }
  ,
  {
    path:'verdetallebook/:idBook',
    component:VerdetallebookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
