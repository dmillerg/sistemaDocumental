import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBootstrapTypeheadComponent } from './ngx-bootstrap-typehead.component';

describe('NgxBootstrapTypeheadComponent', () => {
  let component: NgxBootstrapTypeheadComponent;
  let fixture: ComponentFixture<NgxBootstrapTypeheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxBootstrapTypeheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapTypeheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
