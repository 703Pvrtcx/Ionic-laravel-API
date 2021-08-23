import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../products/product.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
 @Input() product: Product;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
