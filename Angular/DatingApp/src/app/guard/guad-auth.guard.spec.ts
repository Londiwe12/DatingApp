import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guadAuthGuard } from './guad-auth.guard';

describe('guadAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guadAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
