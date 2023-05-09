import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',  
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm : FormGroup;
  constructor(private formBuilder:FormBuilder,
              private productService:ProductService,
              private toastrService:ToastrService ) {


  }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      productName:["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required]

    })
  }

  add(){
    if(this.productAddForm.valid){
        let productModule =  Object.assign({},this.productAddForm.value);
        this.productService.add(productModule).subscribe(response=> {
          this.toastrService.success("response.message","transaction successful")   // Observable (asenkron)
        },responseError=> {
          // this.toastrService.error(responseError,"Error!")
          if(responseError.error.Errors.length > 0){
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].message,"Validation ERROR!")
              
            }
            
          }
        });
        
    }
    else{
      this.toastrService.error("Cannot be added!!","Operation failed")
    }
  
  }


}
