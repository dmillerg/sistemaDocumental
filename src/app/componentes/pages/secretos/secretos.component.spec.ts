import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretosComponent } from './secretos.component';

describe('SecretosComponent', () => {
  let component: SecretosComponent;
  let fixture: ComponentFixture<SecretosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
