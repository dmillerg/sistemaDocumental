import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrdinariosComponent } from './modal-ordinarios.component';

describe('ModalOrdinariosComponent', () => {
  let component: ModalOrdinariosComponent;
  let fixture: ComponentFixture<ModalOrdinariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOrdinariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrdinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
