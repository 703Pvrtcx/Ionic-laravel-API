import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Product } from '../products/product.model';
import { AddProductPage } from '../add-product/add-product.page';
import { ProductsService } from '../../../Services/Products/products.service';
import {UpdatePage  } from '../update/update.page';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @Input() product: Product;
  products$: Observable<Product[]>;
  constructor(private modalCtrl: ModalController,
    private loadindCtrl: LoadingController,
    private prodService: ProductsService) {
      this.prodService.editProduct = false;
    }
  ngOnInit() {
    console.log(this.prodService.editProduct);
  }
  closeModal(role = 'edit'){
    this.modalCtrl.dismiss(this.product,role);
  }
  async openUpdateProductModal()
    {
      this.prodService.editProduct = true;
      const modal = await this.modalCtrl.create({
      component: UpdatePage,
      componentProps: { product: this.product},
    });
    await modal.present();
    const { data: updatedProduct} = await modal.onDidDismiss();
    if(updatedProduct){
      this.product = updatedProduct;
    }
  }
  async onDeleteProduct()
  {
    const loading = await this.loadindCtrl.create({
      message: 'Deleting...' });
      loading.present(); 
      this.prodService.deleteProduct(this.product.id)
      .pipe(take(1))
      .subscribe(()=>{
        loading.dismiss();
        this.closeModal('delete');
      });
  }
}
