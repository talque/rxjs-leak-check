import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeakOninitViewComponent } from './leak-oninit-view.component';
import { MarkdownComponent } from '../../shared/markdown/markdown.component';


describe('LeakOninitViewComponent', () => {
    let component: LeakOninitViewComponent;
    let fixture: ComponentFixture<LeakOninitViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LeakOninitViewComponent,
                MarkdownComponent,
            ],
        })
    .compileComponents();

        fixture = TestBed.createComponent(LeakOninitViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
