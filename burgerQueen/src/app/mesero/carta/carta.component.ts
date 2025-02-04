import { Component, OnInit, /*EventEmitter, Output*/} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import Data from '../../../assets/json/menu.json';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss']
})

export class CartaComponent implements OnInit {
  carta: any = Data.carta;

  constructor(public productService: ProductService) {
  }

  ngOnInit(): void {
  }

  getHamburgerData(dataHamburguesa: any) {
    this.productService.disparador.next(dataHamburguesa);
  }
}
