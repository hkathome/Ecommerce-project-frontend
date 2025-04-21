import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Product[]=[];
  currentCategoryId:number=1;
  searchMode:boolean=false;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })
  }
  listProducts(){
    this.searchMode=this.route.snapshot.paramMap.has('keyword');//keyword is defined in routes mapping in app.module.ts
    //  {path:'search/:keyword',component:ProductListComponent}
    // Passed in from SearchComponent
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
    this.handleListProducts();
    }
  }
  handleSearchProducts(){
    const keyword:string=this.route.snapshot.paramMap.get('keyword')!;
      this.productService.getProductsByName(keyword).subscribe(
        data=>{
          this.products=data;
        }
      )
  }
  handleListProducts(){
        //check if "id" parameter is available
        const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');
        if(hasCategoryId){
          //get the "id" param string. convert string to a number using the "+" symbol
            this.currentCategoryId= +this.route.snapshot.paramMap.get('id')!;
        }
        else{
          //not category id available... default to category 1
          this.currentCategoryId=1;
        }
        //now get the products for this current categoryId
        this.productService.getProductList(this.currentCategoryId).subscribe(
          data=>{
            this.products=data;
          }
        )
  }

}
