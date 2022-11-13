import { TestBed } from '@angular/core/testing';

import { RxjsLeakCheckLibService } from './rxjs-leak-check-lib.service';

describe('RxjsLeakCheckLibService', () => {
    let service: RxjsLeakCheckLibService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RxjsLeakCheckLibService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
