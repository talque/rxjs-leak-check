import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeakOnclickViewComponent } from './leak-onclick-view.component';

describe('LeakOnclickViewComponent', () => {
    let component: LeakOnclickViewComponent;
    let fixture: ComponentFixture<LeakOnclickViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ LeakOnclickViewComponent ]
        })
    .compileComponents();

        fixture = TestBed.createComponent(LeakOnclickViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
