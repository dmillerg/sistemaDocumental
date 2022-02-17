import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailbarComponent } from './detailbar.component';

describe('DetailbarComponent', () => {
  let component: DetailbarComponent;
  let fixture: ComponentFixture<DetailbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
