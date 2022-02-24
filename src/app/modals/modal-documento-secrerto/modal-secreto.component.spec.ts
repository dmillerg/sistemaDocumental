import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSecretoComponent } from './modal-secreto.component';

describe('ModalSecretoComponent', () => {
  let component: ModalSecretoComponent;
  let fixture: ComponentFixture<ModalSecretoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSecretoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSecretoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
