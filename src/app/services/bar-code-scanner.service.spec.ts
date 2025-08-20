import { TestBed } from '@angular/core/testing';

import { BarCodeScannerService } from './bar-code-scanner.service';

describe('BarCodeScannerService', () => {
  let service: BarCodeScannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarCodeScannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
