import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-master-detail-view',
  templateUrl: './product-master-detail-view.component.html',
  styleUrls: ['./product-master-detail-view.component.css']
})
export class ProductMasterDetailViewComponent implements OnInit {
  product!: Product;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
     ()=>{ this.getProduct();
     }
    )
  }
  getProduct(){
    var productId:number=1;
    productId=+this.route.snapshot.paramMap.get("id")!;
    this.productService.getProductById(productId).subscribe(data=>{
      this.product=data;
    })
  }

}
