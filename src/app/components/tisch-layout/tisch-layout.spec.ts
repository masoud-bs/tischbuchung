import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TischLayout } from './tisch-layout';

describe('TischLayout', () => {
  let component: TischLayout;
  let fixture: ComponentFixture<TischLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TischLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(TischLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
