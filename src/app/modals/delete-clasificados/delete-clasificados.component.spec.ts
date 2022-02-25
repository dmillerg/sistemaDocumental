import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClasificadosComponent } from './delete-clasificados.component';

describe('DeleteClasificadosComponent', () => {
  let component: DeleteClasificadosComponent;
  let fixture: ComponentFixture<DeleteClasificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteClasificadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteClasificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
