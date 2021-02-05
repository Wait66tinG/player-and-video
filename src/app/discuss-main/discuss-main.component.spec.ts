import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussMainComponent } from './discuss-main.component';

describe('DiscussMainComponent', () => {
  let component: DiscussMainComponent;
  let fixture: ComponentFixture<DiscussMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
