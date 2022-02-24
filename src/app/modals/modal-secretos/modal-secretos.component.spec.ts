import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSecretosComponent } from './modal-secretos.component';

describe('ModalSecretosComponent', () => {
  let component: ModalSecretosComponent;
  let fixture: ComponentFixture<ModalSecretosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSecretosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSecretosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
