import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  constructor(public aR:ActivatedRoute) { }
  product:any
  ngOnInit(): void {
    this.aR.queryParams.subscribe((data)=>{
      this.product=data;
    })
  }
  
}
