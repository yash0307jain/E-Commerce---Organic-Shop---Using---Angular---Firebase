import { Component, OnInit } from '@angular/core';
import { ProductService } from '../admin/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category;

  constructor(route: ActivatedRoute, productService: ProductService) {
    // productService.getAll().subscribe((products: Product[]) => {
    //   this.products = products;
    //   route.queryParamMap.subscribe(params => {
    //   this.category = params.get('category');

    //   this.filteredProducts = this.category
    //     ? this.products.filter(p => p.category === this.category)
    //     : this.products;
    // });
    // });

    productService
      .getAll()
      .pipe(
        switchMap((products: Product[]) => {
          this.products = products;
          return route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      });
  }

  ngOnInit() {}
}
