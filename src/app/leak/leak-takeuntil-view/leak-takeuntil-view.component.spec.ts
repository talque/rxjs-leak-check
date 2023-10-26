import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeakTakeuntilViewComponent } from './leak-takeuntil-view.component';
import { MarkdownComponent } from '../../shared/markdown/markdown.component';


describe('LeakTakeuntilViewComponent', () => {
    let component: LeakTakeuntilViewComponent;
    let fixture: ComponentFixture<LeakTakeuntilViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LeakTakeuntilViewComponent,
                MarkdownComponent,
            ]
        })
    .compileComponents();

        fixture = TestBed.createComponent(LeakTakeuntilViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
