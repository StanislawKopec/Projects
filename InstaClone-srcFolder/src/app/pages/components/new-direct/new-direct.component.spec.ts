import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDirectComponent } from './new-direct.component';

describe('NewDirectComponent', () => {
  let component: NewDirectComponent;
  let fixture: ComponentFixture<NewDirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
