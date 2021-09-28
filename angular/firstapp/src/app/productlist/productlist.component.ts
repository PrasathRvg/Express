import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  constructor(public pS:ProductService) { }
  products:any
  ngOnInit(): void {
    this.pS.allproducts().subscribe((data)=>{
      this.products=data;
    })
  }
  
  
}
