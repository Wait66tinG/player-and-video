import { TestBed } from '@angular/core/testing';

import { VideolistService } from './videolist.service';

describe('VideolistService', () => {
  let service: VideolistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideolistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
