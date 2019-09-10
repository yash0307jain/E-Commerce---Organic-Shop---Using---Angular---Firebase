import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../admin/category.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  categories$;
  @Input('category') category;

  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }

  ngOnInit() {}
}
