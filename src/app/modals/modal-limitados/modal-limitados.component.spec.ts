import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLimitadosComponent } from './modal-limitados.component';

describe('ModalLimitadosComponent', () => {
  let component: ModalLimitadosComponent;
  let fixture: ComponentFixture<ModalLimitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLimitadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLimitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
