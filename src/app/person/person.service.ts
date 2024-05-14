import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../Models/Person';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private url: string = "http://localhost:5256/api/Persona"
  constructor(private http:HttpClient) { }

  Create(person: Person): Promise<boolean>{
    return new Promise(
      (resolve, reject) =>{
        this.http.post(this.url+'/Agregar', person)
        .pipe(
          catchError((err)=>{
            resolve(false)
            throw err;
          })
        )
        .subscribe(
          (value)=>{
            resolve(true)
          }
        )
      }
    ) 
  }

  Update(person: Person): Promise<boolean>{
    return new Promise(
      (resolve, reject) =>{
        this.http.put(this.url+'/Actualizar', person)
        .pipe(
          catchError((err)=>{
            resolve(false)
            throw err;
          })
        )
        .subscribe(
          (value)=>{
            resolve(true)
          }
        )
      }
    ) 
  }

  Delete(person: Person): Promise<boolean>{
    return new Promise(
      (resolve, reject) =>{
        this.http.delete(this.url+'/Eliminar', {body:person})
        .pipe(
          catchError((err)=>{
            resolve(false)
            throw err;
          })
        )
        .subscribe(
          (value)=>{
            resolve(true)
          }
        )
      }
    ) 
  }

  Get(id:number){

  }
  GetAll(): Promise<Person[]>{
    return new Promise(
      (resolve, reject) =>{
        this.http.get<Person[]>(this.url+'/ObtenerTodos')
        .pipe(
          catchError((err)=>{
            reject(err)
            throw err;
          })
        )
        .subscribe(
          (value)=>{
            resolve(value)
          }
        )
      }
    ) 
  }
}
