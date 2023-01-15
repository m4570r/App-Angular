import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


interface User {
  id: number;
  nombre: string;
  edad: number;
  lineNumber: number;
  estadoFila: boolean;
  boton: string;
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
  boton: string = 'Editar';
 
 //boton editar/guardar
 cambiarEstadoFila(user: User) {
 user.estadoFila = !user.estadoFila; 
 user.boton = user.estadoFila === false ? 'Editar' : 'Guardar';
 if(user.estadoFila === true){
      console.log("Estado actual: true");
    }else{
      console.log("Estado actual: false");
	  this.saveChanges(user);
    }
}

 
  constructor(private http: HttpClient) { 
      for (let i = 0; i < this.searchResults.length; i++) {
      this.searchResults[i].estadoFila = false;
	 this.searchResults[i].boton = 'Editar';
    }
  }

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
		  results[i].boton = 'Editar';
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
	    console.log(this.mensaje);
			 this.search();
}


  // Mostrar formulario agregar usuario
getForm() {
  this.showForm = true;
}

//recargar la pagina
reloadPage() {
  location.assign(location.href + 'index.html');
}



//editar usuario
saveChanges(user: User) {
  console.log(user.id);
  console.log(user.nombre);
  console.log(user.edad);

  let putUrl = 'http://200.28.183.138/index.php/updateUser';
  let payload = {
    "id": user.id,
    "nombre": user.nombre,
    "edad": user.edad
  }
  this.http.put<any>(putUrl, payload).subscribe(response => {
    this.mensaje = response.mensaje;
    console.log(this.mensaje);
	this.search();
  });
}


  // Eliminar usuario
deleteUser(user: User) {
  let deleteUrl = 'http://200.28.183.138/index.php/deleteUser';
  let payload = {
    "id": user.id
  }
  this.http.delete<any>(deleteUrl, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    body: payload
  }).subscribe(response => {
    this.mensaje = response.mensaje;
	console.log(this.mensaje);
	 this.search();
  });
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
	this.mensaje = '';
  }

 
}
