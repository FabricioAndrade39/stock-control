import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GetCategorieResponse } from 'src/app/models/interfaces/categories/responses/GetCategorieResponse';
import { EditCategoryAction } from 'src/app/models/interfaces/categories/responses/event/EditCategoryAction';
import { CategoryEvent } from 'src/app/models/enums/products/categories/CategoryEvent';
import { DeleteCategoryAction } from 'src/app/models/interfaces/categories/responses/event/DeleteCategoryAction';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: [],
})
export class CategoriesTableComponent {
  @Input() public categories: Array<GetCategorieResponse> = [];
  @Output() public categoryEvent = new EventEmitter<EditCategoryAction>();
  @Output() public deleteCategoryEvent = new EventEmitter<DeleteCategoryAction>();
  public categorySelected!: GetCategorieResponse;
  public addCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_ACTION;

  handleDeleteCategoryEvent(category_id: string, categoryName: string): void {
    if (category_id !== '' && categoryName !== '') {
      this.deleteCategoryEvent.emit({ category_id, categoryName });
    }
  }

}
