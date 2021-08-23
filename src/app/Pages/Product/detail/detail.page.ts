import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  @Input() product: Product;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
  }
}

