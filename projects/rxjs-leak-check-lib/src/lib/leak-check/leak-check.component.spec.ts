import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeakCheckComponent } from './leak-check.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { LeakCheckViewModel } from './leak-check.view-model';
import { LeakFilter } from '../leak-check-view/leak-filter.enum';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HelpCardComponent } from '../help-card/help-card.component';


describe('LeakCheckComponent', () => {
    let component: LeakCheckComponent;
    let fixture: ComponentFixture<LeakCheckComponent>;

    const view: LeakCheckViewModel = {
        menu: {
            label: 'filter',
            selected: LeakFilter.ALL,
            options: [],
        },
        page: {
            index: 1,
            length: 2,
            pageSize: 3,
        },
        pageSizeOptions: [5, 10, 20],
        help: true,
        subscriptions: [],
        allSubscriptions: [],
        progress: undefined,
    };
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LeakCheckComponent,
                HelpCardComponent,
            ],
            imports: [
                NoopAnimationsModule,
                MatMenuModule,
                MatPaginatorModule,
                MatToolbarModule,
                MatIconModule,
                MatCardModule,
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LeakCheckComponent);
        component = fixture.componentInstance;
        component.view = view;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
