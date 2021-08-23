import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { ProductsService } from 'src/app/Services/Products/products.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
 @Input() product: Product;
  form:  FormGroup;
  constructor( private loadingCtrl: LoadingController,
    private modalContrl: ModalController,
    private productService: ProductsService) { }

  ngOnInit() {
      this.form =  new FormGroup({
        name : new FormControl(this.product.name,[Validators.required]),
        price : new FormControl(this.product.price,[Validators.required]),
        category : new FormControl(this.product.category,[Validators.required]),
        imageURL : new FormControl(this.product.imageURL,[Validators.required]),
        description : new FormControl(this.product.description),
  });
  }
  closeModal(data=null){
    this.modalContrl.dismiss(data);
  }
  async submitProduct(){
    const loading = await this.loadingCtrl.create({message: 'Updating ...'});
    loading.present();
    this.productService.updateProduct(this.product.id, this.form.value).
    pipe(take(1))
    .subscribe((product)=>{
      this.form.reset();
      loading.dismiss();
      this.closeModal(product);
    });
  }
}
