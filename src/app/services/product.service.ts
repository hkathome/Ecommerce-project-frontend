import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl='http://localhost:9090/api/products';
  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId:number): Observable<Product[]> {
    //need to build URL based on category id ... will come back to this!
    const newUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponse>(newUrl).pipe(
      map(response=>response._embedded.products)
    );
  }
}
interface GetResponse{
  _embedded:{
    products:Product[];
  }
}
