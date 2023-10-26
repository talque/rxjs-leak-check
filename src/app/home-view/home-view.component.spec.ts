import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeViewComponent } from './home-view.component';
import { MarkdownComponent } from '../shared/markdown/markdown.component';


describe('HomeViewComponent', () => {
    let component: HomeViewComponent;
    let fixture: ComponentFixture<HomeViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                HomeViewComponent,
                MarkdownComponent,
            ]
        })
    .compileComponents();

        fixture = TestBed.createComponent(HomeViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
