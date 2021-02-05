import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { eventoModel } from 'src/app/models/evento.model';
import { EventsService } from 'src/app/services/events.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    'table {width:100%;}'
  ]
})
export class HomeComponent implements OnInit,AfterViewInit  {
  eventData = new eventoModel;
  columns: string[] = ['id','nombre','categoria','lugar','direccion','fechaInicio','fechaFin','boton'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private event:EventsService, private route:Router) { }

  ngOnInit(): void {
    this.event.getEvents().subscribe((resp:any)=>{
      this.dataSource.data = resp;
    });
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  logout(){
    this.event.logout().subscribe(resp=>{
      this.event.sessionErase();
      this.route.navigateByUrl('/login');
    });
  }
  remove(id:string){
    Swal.fire({
      title: 'Do you want to delete this event?',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      cancelButtonText: `Cancel`,
    }).then((result)=>{
      if (result.isConfirmed) {
        this.event.removeEvent(id).subscribe(resp=>{
          this.ngOnInit();
        })
      }
    });
  }
}
