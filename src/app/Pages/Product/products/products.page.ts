import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ProductsService } from 'src/app/Services/Products/products.service';
import { Product } from './product.model';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { DetailsPage } from '../details/details.page';
import { UpdatePage } from '../update/update.page';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products$: Observable<Product[]>;
  constructor(
    private productssService: ProductsService,
    private modalCtrl: ModalController,
  
    private loadingCtrl: LoadingController, ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading ...'
     });
     loading.present();
      this.products$ = this.productssService.getProducts().pipe(
          tap(product=>{
             loading.dismiss();
            return product;
          })
          
       );
       loading.dismiss();
       console.log(this.products$);
  }
  async openDetailModal(product: Product){
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: {product}
    });
     modal.present();
     const { data: updatedProduct, role } = await modal.onDidDismiss();
     if(updatedProduct && role === 'edit'){
      this.products$ = this.products$.pipe(
        map((products) => {
            products.forEach((prod) => {
              if(prod.id === updatedProduct.id){
                prod = updatedProduct;
              }
              return prod;
          });
          return products;
        })
      );
     }
     if (role ==='delete') {
      this.products$ = this.products$.pipe(
        map((products) => {
          products.filter((prod) => prod.id !== updatedProduct.id);
          return products;
        })
      );
     }
    }

}
