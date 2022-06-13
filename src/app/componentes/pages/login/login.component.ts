import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from 'ngx-webstorage';
import { ModalUsuarioComponent } from 'src/app/modals/modal-usuario/modal-usuario.component';
import { ApiService } from 'src/app/service/api.service';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ transform: 'translateX(50%)', opacity: 0 }), stagger('100ms', animate('1000ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true }
    )
  ])
]);

const scaleAnimation = trigger('scaleAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(50%)', opacity: 0 }),
    animate('500ms', style({ transform: 'translateX(0%)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ transform: 'scale(1)', opacity: 1 }),
    animate('500ms', style({ transform: 'scale(0)', opacity: 0 })),
  ]),
]);
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [listAnimation, scaleAnimation]
})
export class LoginComponent implements OnInit {

  usuario: string = '';
  password: string = '';
  usuario_error: boolean = false;
  password_error: boolean = false;
  see: boolean = false;
  error: string = '';

  constructor(private api: ApiService, private storage: SessionStorageService, private router: Router) { }

  ngOnInit(): void {

  }
  loguear() {
    if (this.usuario == '') {
      this.usuario_error = true;
    } else this.usuario_error = false;
    if (this.password == '') {
      this.password_error = true;
    } else this.password_error = false;
    var formData = new FormData();
    formData.append('usuario', this.usuario);
    formData.append('password', this.password);
    this.api.login(formData).subscribe((result) => {
      console.log(result);
      this.storage.store('usuario', result);
      this.router.navigate(['inicio'])
    }, (error) => {
      this.error = error.error.message;
      console.log(error.error.message);
    }
    );
  }
}
