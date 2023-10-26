import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatToolbarModule } from '@angular/material/toolbar';
import { LeakCheckComponent } from '../leak-check/leak-check.component';
import { LeakCheckSubscriptionListService } from '../observable/leak-check-subscription-list.service';
import { RxjsLeakCheckViewComponent } from './leak-check-view.component';
import { MatMenuModule } from '@angular/material/menu';
import { DetailCardComponent } from '../detail-card/detail-card.component';
import { HelpCardComponent } from '../help-card/help-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


const mockLeakCheckSubscriptionListService = {
    subscriptions: () => [],
}


describe('RxjsLeakCheckViewComponent', () => {
    let component: RxjsLeakCheckViewComponent;
    let fixture: ComponentFixture<RxjsLeakCheckViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                RxjsLeakCheckViewComponent,
                LeakCheckComponent,
                DetailCardComponent,
                HelpCardComponent,
            ],
            imports: [
                NoopAnimationsModule,
                MatToolbarModule,
                MatMenuModule,
                MatCardModule,
                MatIconModule,
                MatPaginatorModule,
            ],
            providers: [
                { provide: LeakCheckSubscriptionListService, useValue: mockLeakCheckSubscriptionListService },
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(RxjsLeakCheckViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
