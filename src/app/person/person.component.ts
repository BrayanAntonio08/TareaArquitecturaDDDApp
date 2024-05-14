import { Component } from '@angular/core';
import { Person } from '../Models/Person';
import { FormsModule } from '@angular/forms';
import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent {
  people: Person[] = [];
  editPerson: Person | undefined = undefined;
  modalTitle: string = '';

  constructor(private personService: PersonService){
    this.personService.GetAll().then(value => this.people = value);
  }

  modalCreate(){
    this.modalTitle = 'Crear persona';
    this.editPerson = new Person();
  }
  modalUpdate(person:Person){
    this.modalTitle = 'Actualizar persona';
    this.editPerson = person
  }

  CompleteOperation(){
    if(this.editPerson !== undefined){
      if(this.editPerson.id === 0){
        this.personService.Create(this.editPerson).then(complete => {
          if(complete){
            this.personService.GetAll().then(value => this.people = value);
            this.editPerson = undefined;
          }
        })
      }else{
        this.personService.Update(this.editPerson).then(complete => {
          if(complete){
            this.personService.GetAll().then(value => this.people = value);
            this.editPerson = undefined;
          }
        })
      }
    }
  }

  DeletePerson(person:Person){
    this.personService.Delete(person).then(value=>{
      this.personService.GetAll().then(value => this.people = value);
    })
  }
  cancelOperation(){
    this.editPerson = undefined;
  }
}
