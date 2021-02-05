import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { eventoModel } from 'src/app/models/evento.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styles: [
  ]
})
export class EventComponent implements OnInit {
  eventForm: FormGroup;
  event:eventoModel;
  enable:Boolean = false;
  constructor(private eventservice:EventsService,private active:ActivatedRoute,
              private route:Router,private fb:FormBuilder) {            
                this.createForm();
  }

  ngOnInit(): void {
    this.event = new eventoModel;
    this.data();
  }

  data(){
    
    this.active.params.subscribe(params=>{
      if (this.route.url == '/event/view/' + params['id']) {
        this.enable = true;
        this.eventForm.disable();
      } else { 
        this.enable = false;
      }
      if (params['id'] == null) {
        this.event = new eventoModel;
      }else{
        this.eventservice.findEvent(params['id']).subscribe((resp:any)=>{
          this.event = resp;
          this.eventForm.controls['id'].setValue(this.event.id);
          this.eventForm.controls['nombre'].setValue(this.event.nombre);
          this.eventForm.controls['categoria'].setValue(this.event.categoria);
          this.eventForm.controls['lugar'].setValue(this.event.lugar);
          this.eventForm.controls['direccion'].setValue(this.event.direccion);
          this.eventForm.controls['fechaInicio'].setValue(this.event.fechaInicio);
          this.eventForm.controls['fechaFin'].setValue(this.event.fechaFin);
        })
      }
    })
  }

  createForm(){
    this.eventForm = this.fb.group({
      id: [''],
      nombre: ['',[Validators.required]],
      categoria: ['',[Validators.required,Validators.pattern('[0-9]{1}')]],
      lugar: ['',Validators.required],
      direccion: ['',Validators.required],
      fechaInicio: ['',Validators.required],
      fechaFin: ['',Validators.required],
    });
  }

  get validName(){
    return this.eventForm.get('nombre').invalid && this.eventForm.get('nombre').touched;
  }

  get validCategory(){
    return this.eventForm.get('categoria').invalid && this.eventForm.get('categoria').touched;
  }

  get validLocation(){
    return this.eventForm.get('lugar').invalid && this.eventForm.get('lugar').touched;
  }

  get validAddress(){
    return this.eventForm.get('direccion').invalid && this.eventForm.get('direccion').touched;
  }

  get validDateStart(){
    return this.eventForm.get('fechaInicio').invalid && this.eventForm.get('fechaInicio').touched;
  }

  get validDateEnd(){
    return this.eventForm.get('fechaFin').invalid && this.eventForm.get('fechaFin').touched;
  }

  save(){
    if (this.eventForm.invalid) {
      return Object.values( this.eventForm.controls).forEach(controll=>{
        if (controll instanceof FormGroup) {
          Object.values(controll.controls).forEach(control => control.markAsTouched());
        } else {
          controll.markAsTouched();
        }        
      });
    }
    this.event = this.eventForm.value;
    this.eventservice.saveEvent(this.event).subscribe(resp=>{
      this.route.navigateByUrl('/home');
    });
  }

  edit(){
    this.event = this.eventForm.value;
    this.eventservice.editEvent(this.event).subscribe(resp=>{
      this.route.navigateByUrl('/home');
    });
  }

  actions(){
    this.active.params.subscribe(params=>{
      if (this.route.url == '/event/edit/' + params['id']) {
        this.edit();
      } else { 
        this.save();
      }
    })
  }
}
