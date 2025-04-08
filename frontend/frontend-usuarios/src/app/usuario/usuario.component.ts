import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // también lo necesitas aquí

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
  <div class="container mt-5">
    <h2 class="mb-4">Crear Usuario</h2>
    <form (ngSubmit)="crearUsuario()" #form="ngForm" class="row g-3">
      <div class="col-md-4">
        <label class="form-label">Nombre</label>
        <input [(ngModel)]="nuevoUsuario.nombre" name="nombre" required class="form-control" />
      </div>
      <div class="col-md-4">
        <label class="form-label">Email</label>
        <input [(ngModel)]="nuevoUsuario.email" name="email" required class="form-control" />
      </div>
      <div class="col-md-4">
        <label class="form-label">Edad</label>
        <input type="number" [(ngModel)]="nuevoUsuario.edad" name="edad" required class="form-control" />
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary mt-3">Crear</button>
      </div>
    </form>

    <hr class="my-5" />

    <h2 class="mb-4">Lista de Usuarios</h2>
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Edad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let usuario of usuarios">
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.email }}</td>
          <td>{{ usuario.edad }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" (click)="editarUsuario(usuario)">Editar</button>
            <button class="btn btn-danger btn-sm" (click)="eliminarUsuario(usuario.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div *ngIf="usuarioEditando" class="card mt-5 p-4 bg-light">
      <h3 class="mb-3">Editar Usuario</h3>
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input [(ngModel)]="usuarioEditando.nombre" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input [(ngModel)]="usuarioEditando.email" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Edad</label>
        <input type="number" [(ngModel)]="usuarioEditando.edad" class="form-control" />
      </div>
      <button class="btn btn-success me-2" (click)="actualizarUsuario()">Guardar</button>
      <button class="btn btn-secondary" (click)="cancelarEdicion()">Cancelar</button>
    </div>
  </div>
`

})
export class UsuarioComponent implements OnInit {
  usuarios: any[] = [];
  nuevoUsuario = { nombre: '', email: '', edad: 0 };
  usuarioEditando: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.http.get<any[]>('http://localhost:8080/usuarios').subscribe(data => {
      this.usuarios = data;
    });
  }

  crearUsuario() {
    this.http.post('http://localhost:8080/usuarios', this.nuevoUsuario).subscribe(() => {
      this.nuevoUsuario = { nombre: '', email: '', edad: 0 };
      this.getUsuarios();
    });
  }

  eliminarUsuario(id: number) {
    this.http.delete(`http://localhost:8080/usuarios/${id}`).subscribe(() => {
      this.getUsuarios();
    });
  }

  editarUsuario(usuario: any) {
    this.usuarioEditando = { ...usuario };
  }

  actualizarUsuario() {
    this.http
      .put(`http://localhost:8080/usuarios/${this.usuarioEditando.id}`, this.usuarioEditando)
      .subscribe(() => {
        this.usuarioEditando = null;
        this.getUsuarios();
      });
  }

  cancelarEdicion() {
    this.usuarioEditando = null;
  }
}
