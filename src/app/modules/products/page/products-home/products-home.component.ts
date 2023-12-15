
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from './../../../../shared/services/products/products-data-transfer.service';
import { GetAllProductsResponse } from './../../../../models/interfaces/products/response/GetAllProductsResponse';
import { EventAction } from 'src/app/models/interfaces/products/event/eventAction';


@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: [],
})
export class ProductsHomeComponent implements OnInit ,OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public productsDatas: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsService,
    private productsDtService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.getServiceProductsDatas();
  }
  getServiceProductsDatas() {
    const productsLoaded = this.productsDtService.getProductsDatas();

    if(productsLoaded.length > 0) {
      this.productsDatas = productsLoaded;
      console.log('DADOS DE PRODUTOS', this.productsDatas);
    } else this.getAPIProductsDatas();

    console.log('DADOS DE PRODUTOS', this.productsDatas);
  }

  getAPIProductsDatas() {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if(response.length > 0) {
            this.productsDatas = response;
            console.log('DADOS DE PRODUTOS', this.productsDatas);
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos!',
            life: 2500,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleProductAction(event: EventAction): void {
    if(event) {
      console.log('DADOS DO EVENTO RECEBIDO', event);
    }
  }

  handleDeleteProductAction(event: {
    product_id: string;
    productName: string;
  }): void {
    if(event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto ${event?.productName}?`,
        header: 'Confirmação de exclusão',
        icon:'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteProduct(event?.product_id),
      });
    }
  }
  deleteProduct(product_id: string) {
    if(product_id) {
      this.productsService
        .deleteProduct(product_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if(response) {
              this.messageService.add({
                severity: 'success',
                summary: 'sucesso',
                detail: 'Produto removido com sucesso!',
                life: 2500,
              });

              this.getAPIProductsDatas();
            }
          }, error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Erro ao remover produto!'
            });
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


