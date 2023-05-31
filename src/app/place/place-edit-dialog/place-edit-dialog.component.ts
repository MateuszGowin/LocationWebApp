import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlaceService } from '../place.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Place } from 'src/app/model/place';
import { Type } from 'src/app/model/type';

@Component({
  selector: 'app-place-edit-dialog',
  templateUrl: './place-edit-dialog.component.html',
  styleUrls: ['./place-edit-dialog.component.css']
})
export class PlaceEditDialogComponent implements OnInit{
  placeForm!: FormGroup;

  types: string[] = (Object.keys(Type) as (keyof typeof Type)[]).map(
    (key,index) => {
      console.log(key);
      return Type[key];
    },
  );

  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlaceService,
    private matDialogRef: MatDialogRef<PlaceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.placeForm = this.formBuilder.group({
      name: '',
      type: '',
      city: '',
      street: '',
      number: '',
      latitude: '',
      longitude: '',
    })
  }

  ngOnInit(): void {    
    this.placeForm.patchValue({      
      name: this.data.name,
      type: this.data.type,
      city: this.data.address.city,
      street: this.data.address.street,
      number: this.data.address.number,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
    });
  }

  onFormSubmit() {
    if(this.placeForm.valid) {
      if(this.data) {
        this.placeService.updatePlace(this.data.id,this.getPlaceForm())
        .subscribe({
          next: (res) => {
            this.matDialogRef.close(true);
          },
          error: (error) => {
            alert(error.message);
          }
        })
      }
    }
  }

  private getPlaceForm(): Place {
    const findKeyByValue = (value: string, enumObj: any)=>{
      return Object.keys(enumObj).find(key=> enumObj[key]===value);
    };
    const place: Place = {
      id: this.placeForm.value.id,
      name: this.placeForm.value.name,
      latitude: this.placeForm.value.latitude,
      longitude: this.placeForm.value.longitude,
      type: findKeyByValue(this.placeForm.value.type,Type),
      address: {
        city: this.placeForm.value.city,
        number: this.placeForm.value.number,
        street: this.placeForm.value.street
      }
    };
    return place;
  }
}
