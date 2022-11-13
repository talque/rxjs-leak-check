import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsLeakCheckViewComponent } from './leak-check-view.component';

describe('RxjsLeakCheckViewComponent', () => {
    let component: RxjsLeakCheckViewComponent;
    let fixture: ComponentFixture<RxjsLeakCheckViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ RxjsLeakCheckViewComponent ]
        })
    .compileComponents();

        fixture = TestBed.createComponent(RxjsLeakCheckViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
