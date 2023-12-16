import { Component, Input } from '@angular/core';
import { GetCategorieResponse } from 'src/app/models/interfaces/categories/responses/GetCategorieResponse';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: [],
})
export class CategoriesTableComponent {
  @Input() public categories: Array<GetCategorieResponse> = [];
  public categorySelected!: GetCategorieResponse;
}
