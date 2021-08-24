import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdetallebookComponent } from './verdetallebook.component';

describe('VerdetallebookComponent', () => {
  let component: VerdetallebookComponent;
  let fixture: ComponentFixture<VerdetallebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerdetallebookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdetallebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
