import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { DataTableResource } from 'angular-bootstrap-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  itemPerPage: number;

  constructor(private productService: ProductService) {
    this.subscription = productService
      .getAll()
      .subscribe((products: Product[]) => {
        this.products = products;

        this.initializeTable(products, 10);
      });
  }

  ngOnInit() {}

  private initializeTable(products: Product[], itemPerPage: number) {
    this.tableResource = new DataTableResource(products);
    this.tableResource
      .query({ offset: 0, limit: itemPerPage })
      .then(items => (this.items = items));
    this.tableResource.count().then(count => (this.itemCount = count));
  }

  reloadItems(params) {
    if (!this.tableResource) {
      return;
    }
    this.itemPerPage = params.limit;
    this.tableResource.query(params).then(items => (this.items = items));
  }

  filter(query: string) {
    const filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;

    this.initializeTable(filteredProducts, this.itemPerPage);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
