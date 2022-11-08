import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClasificadosComponent } from './modal-confidencial.component';

describe('ModalClasificadosComponent', () => {
  let component: ModalClasificadosComponent;
  let fixture: ComponentFixture<ModalClasificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClasificadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalClasificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
