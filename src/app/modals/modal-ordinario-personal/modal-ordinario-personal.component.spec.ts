import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrdinarioPersonalComponent } from './modal-ordinario-personal.component';

describe('ModalOrdinarioPersonalComponent', () => {
  let component: ModalOrdinarioPersonalComponent;
  let fixture: ComponentFixture<ModalOrdinarioPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOrdinarioPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrdinarioPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
