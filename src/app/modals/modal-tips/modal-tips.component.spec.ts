import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTipsComponent } from './modal-tips.component';

describe('ModalTipsComponent', () => {
  let component: ModalTipsComponent;
  let fixture: ComponentFixture<ModalTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
