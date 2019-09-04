import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {}

  save(product: Product) {
    // console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
