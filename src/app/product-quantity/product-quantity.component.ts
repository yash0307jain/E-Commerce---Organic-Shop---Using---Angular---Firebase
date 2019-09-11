import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {}

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }
}
