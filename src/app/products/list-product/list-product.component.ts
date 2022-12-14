import { ProductService } from './../../core/services/product.service';
import { StatsService } from './../../core/services/stats.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Product} from "../../core/model/product";
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  public title: String;
  public list: Product[];
  public all: Product[];
  priceMax: number;
  public count: number;
  constructor(private route: ActivatedRoute,
    private stats: StatsService, private productService:ProductService) {
  }
  ngOnInit(): void {
    //category
    console.log(this.route);
    //let category= this.route.snapshot.params['category'];
    this.title= 'My App Store';
    this.productService.getAllProduct().subscribe(
      (data:Product[])=>{this.all = data;this.list=data
      this.count=this.stats.getCount(this.all,'quantity',0)
      this.route.params.subscribe(
        (params)=>{
          if(params['category']!=null){
            this.list= this.all.filter((product)=>
              product.category==params['category']
             )
          }else{
            this.list= this.all
          }
        }
      )}
      
    ); 
  }

  incrementLike(product: Product): void{
    let i= this.list.indexOf(product);
    if(i!=-1){
      //this.list[i].nbrLike++
      //connect to the backend side
      product.nbrLike++;
      this.productService.updateProduct(product).subscribe();
    }
  }
  buyProduct(product: Product): void{
    let i= this.list.indexOf(product);
    if(i!=-1){
      //this.list[i].quantity--
      //connect to the backend side
      product.quantity--
      this.productService.updateProduct(product).subscribe(
        ()=>{this.count=this.stats.getCount(this.all,'quantity',0)}
      );
      
    }
  }
}
