import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeakCheckComponent } from './leak-check.component';

describe('LeakCheckComponent', () => {
    let component: LeakCheckComponent;
    let fixture: ComponentFixture<LeakCheckComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ LeakCheckComponent ]
        })
    .compileComponents();

        fixture = TestBed.createComponent(LeakCheckComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
