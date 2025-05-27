import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl='http://localhost:9090/api/products';
  private categoryUrl='http://localhost:9090/api/product-category';
  constructor(private httpClient: HttpClient) { }
  
  getProductListPaginate(thePage:number, 
                        thePageSize:number,
                        theCategoryId:number): Observable<GetResponse> {
    //need to build URL based on category id, page and size ... will come back to this!
    const newUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                  +`&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponse>(newUrl).pipe(
      map(response=>response)
    );
  }
  getProductList(theCategoryId:number): Observable<Product[]> {
    //need to build URL based on category id ... will come back to this!
    const newUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponse>(newUrl).pipe(
      map(response=>response._embedded.products)
    );
  }
  getProductCategories():Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response=>response._embedded.productCategory)
    );
  }
  getProductsByName(theKeyword:string):Observable<Product[]>{
    const newUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.httpClient.get<GetResponse>(newUrl).pipe(
      map(response=>response._embedded.products)
    );
  }
  getProductById(productId:number):Observable<Product>{
    const newUrl=`${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(newUrl).pipe(
      map(response=>response)
    );
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}
interface GetResponse{
  _embedded:{
    products:Product[];
  },
  page:{
    size:number,//size of the page
    totalElements:number,//total of all elements in the database
    totalPages:number, //total pages available
    number:number //current page number
  }
}

