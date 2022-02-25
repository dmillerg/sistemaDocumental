import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinariosPersonalComponent } from './ordinarios-personal.component';

describe('OrdinariosPersonalComponent', () => {
  let component: OrdinariosPersonalComponent;
  let fixture: ComponentFixture<OrdinariosPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdinariosPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinariosPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
