import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


interface User {
  id: number;
  nombre: string;
  edad: number;
  lineNumber: number;
}


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {
  searchTerm = '';
  selectedOption = '';
  searchResults: User[] = [];
  showForm = false;
  showVersion = false;  
  version: string = "";
  responseData: any;
  status: any;
  mensaje: any;
  name: any;
  age: any;
  id: any;
  nombre: string = "";
  edad: number = 0;
  numero = 1;
  lineNumber = 0;
  editMode = true;
selectedUser: User = {
id:0,
nombre:'',
edad:0,
lineNumber: 0
};
  
  constructor(private http: HttpClient) { }

  // Buscar usuarios
search() {
    let searchUrl = 'http://200.28.183.138/index.php/users';
    if (this.selectedOption && this.searchTerm) {
      searchUrl = `http://200.28.183.138/index.php/user?${this.selectedOption}=${this.searchTerm}`;
    }
    this.http.get<User[]>(searchUrl).subscribe(
      (results) => {
	    this.searchResults = [];
        for (let i = 0; i < results.length; i++) {
          let numero = i + 1;
          results[i].lineNumber = numero;
          this.searchResults.push(results[i]);
        }
      },
      (error) => console.error(error)
    );
  }
  
addUser() {
    let payload = {
      "nombre": this.nombre,
      "edad": this.edad
    }
    this.http.post<any>("http://200.28.183.138/index.php/addUser", payload).subscribe(response => {
      this.name = response.nombre,
	  this.age = response.edad,
      this.mensaje = response.mensaje,
	  this.nombre = "",
	  this.edad = 0,
      this.showForm = false
    });
}


  // Mostrar usuario
getForm() {
  this.showForm = true;
}



toggleEditMode() {
this.editMode = !this.editMode;
}

selectUser(user: User) {
this.selectedUser = user;
}

saveChanges(id:number, nombre:string, edad:number) {
console.log(id);
console.log(nombre);
console.log(edad);
  /*if (this.editMode && this.selectedUser) {
    let putUrl = 'http://200.28.183.138/index.php/updateUser';
    let payload = {
      "id": this.selectedUser.id,
      "nombre": this.selectedUser.nombre,
      "edad": this.selectedUser.edad
    }
    this.http.put<any>(putUrl, payload).subscribe(response => {
      this.mensaje = response.mensaje;
      this.editMode = false;
    });
  } else {
    this.editMode = false;
  }*/
}

  editUser(id:number, nombre:string, edad:number) {
    //aqui va la funcion
  }


  cancelChanges() {
    this.editMode = false;
  }

  // Eliminar usuario
  deleteUser(id: number) {
    //aqui va la funcion
  }

cancelAddUser() {
  this.nombre = "";
  this.edad = 0;
  this.showForm = false
}


  getVersion(){
      this.http.get<any>("http://200.28.183.138/index.php/version").subscribe(response => this.version = response.version)
      this.showVersion = true;
  }
  
  hideVersion(){
      this.showVersion = false;
  }
  
  reset() {
    this.searchResults = []; // vaciamos los resultados de la tabla
    this.searchTerm = ''; // vaciamos el campo de búsqueda
    this.selectedOption = ''; // vaciamos el campo de opciones
	this.showForm = false
	this.showVersion = false
  }

 
}
