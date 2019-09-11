import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../admin/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category;
  cart;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
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

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      cart => {
        this.cart = cart;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
