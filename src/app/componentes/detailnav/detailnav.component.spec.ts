import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailnavComponent } from './detailnav.component';

describe('DetailnavComponent', () => {
  let component: DetailnavComponent;
  let fixture: ComponentFixture<DetailnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
