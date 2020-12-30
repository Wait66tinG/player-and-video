import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerVideoListComponent } from './player-video-list.component';

describe('PlayerVideoListComponent', () => {
  let component: PlayerVideoListComponent;
  let fixture: ComponentFixture<PlayerVideoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerVideoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
