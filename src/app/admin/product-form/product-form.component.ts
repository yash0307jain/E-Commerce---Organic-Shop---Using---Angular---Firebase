import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = { title: '', price: 0, category: '', imageUrl: '' };
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService
        .getProduct(this.id)
        .pipe(take(1))
        .subscribe(
          (p: {
            title: string;
            price: number;
            category: string;
            imageUrl: string;
          }) => {
            this.product = p;
          }
        );
    }
  }

  ngOnInit() {}

  save(product: Product) {
    if (this.id) {
      this.productService.updateProduct(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete thsi product?')) {
      return;
    }
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }
}
