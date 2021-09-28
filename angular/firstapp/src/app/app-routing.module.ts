import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProductlistComponent } from './productlist/productlist.component';

const routes: Routes = [
{
  path:"home",
  component:HomeComponent
},
{
  path:"about",
  component:AboutusComponent
},
{
  path:"productslist",
  component:ProductlistComponent
},
{
  path:"contact",
  component:ContactusComponent
},
{
  path:"product",
  component:ProductdetailsComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
