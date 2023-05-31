import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Place } from '../model/place';
import { PlaceService } from './place.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PlaceEditDialogComponent } from './place-edit-dialog/place-edit-dialog.component';
import { Type } from '../model/type';
@Component({
  selector: 'app-places',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit,AfterViewInit{
  public places!: Place[];

  displayedColumns: string[] = [
    'id', 
    'name', 
    'address', 
    'coordinates',
    'type',
    'accept',
    'action'];
  dataSource = new MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();  
    this.dataSource.filterPredicate = (data, filter) => {
      const searchString = filter.toLowerCase().trim();
        return this.displayedColumns.some(col => {
            const value = data[col];
            if (col === 'address') {
              return `${data.address.city}, ul.${data.address.street} ${data.address.number}`.toLocaleLowerCase().includes(searchString);
              
            }
            if(col === 'coordinates') {    
                       
              return `(${data.longitude},${data.latitude})`.includes(filter);
            }
            return value && value.toString().toLowerCase().includes(searchString);
        });      
    }    
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private placeService: PlaceService,
    private dialog: MatDialog,
    ){}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getPlaces();
  }

  public getPlaces(): void {
    this.placeService.getPlaces().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.places = res;
        for(const place of this.places){
          place.type = Type[place.type as keyof typeof Type]
        }
      },
      error: (error) => {
        alert(error.message);
      }
    })
  }
  public deletePlace(id: number): void {
    this.placeService.deletePlace(id).subscribe({
      next: (res) => {
        alert("Place deleted!");
      },
      error: (error) => {
        alert(error.message);
      }
    })
  }
  public updatePlace(id: number,place: Place): void {
    this.placeService.updatePlace(id,place).subscribe({
      next: (res) => {
        alert("Place edited!");
        this.getPlaces();
      },
      error: (error) => {
        alert(error.message);
      }
    })
  }
  public acceptPlace(id: number): void {
    this.placeService.acceptPlace(id).subscribe({
      next: (res) => {
        alert("Place accpeted!");
        this.getPlaces();
      },
      error: (error) => {
        alert(error.message);
      }
    })
  }
  public openEditForm(data: any) {
    const dialogRef = this.dialog.open(PlaceEditDialogComponent,{data})
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if(res) {
          this.getPlaces();
        }
      }
    })
  }
  public getNotAcceptedPlaces() {

    this.placeService.getPlaces().subscribe({
      next: (res) => {
        this.places = this.places.filter(place => place.is_accepted === false);
        this.dataSource = new MatTableDataSource(this.places);
        this.dataSource.paginator = this.paginator;
        this.paginator.firstPage();
        
      },
      error: (error) => {
        alert(error.message);
      }
    })

  }
}
