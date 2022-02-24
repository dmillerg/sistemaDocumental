import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinariosComponent } from './ordinarios.component';

describe('OrdinariosComponent', () => {
  let component: OrdinariosComponent;
  let fixture: ComponentFixture<OrdinariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdinariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
