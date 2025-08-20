import { TestBed } from '@angular/core/testing';

import { NetworkPluginService } from './network-plugin.service';

describe('NetworkPluginService', () => {
  let service: NetworkPluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkPluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
