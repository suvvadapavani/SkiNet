import { Component, inject } from '@angular/core';
import { ShopService } from '../../../Core/Services/Shop/shop.service';
import {MatDivider} from '@angular/material/divider'
import {MatListOption,MatSelectionList} from  '@angular/material/list'
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters-dailog',
  imports: [
    MatDivider,
    MatListOption,
    MatSelectionList,
    MatButton,
    FormsModule
  ],
  standalone:true,
  templateUrl: './filters-dailog.component.html',
  styleUrl: './filters-dailog.component.scss',
})
export class FiltersDailogComponent {
  shopService=inject(ShopService);
  private dialogRef=inject(MatDialogRef<FiltersDailogComponent>);
  data=inject(MAT_DIALOG_DATA)
  selectedBrands:string[]=this.data.selectedBrands;
  selectedTypes:String[]=this.data.selectedTypes;
  applyFilters(){
    this.dialogRef.close({
      selectedBrands:this.selectedBrands,
      selectedTypes:this.selectedTypes
    })
  }
}

