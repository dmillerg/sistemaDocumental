import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitadosComponent } from './limitados.component';

describe('LimitadosComponent', () => {
  let component: LimitadosComponent;
  let fixture: ComponentFixture<LimitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
