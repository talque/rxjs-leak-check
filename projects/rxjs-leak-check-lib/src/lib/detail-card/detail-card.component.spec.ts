import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DetailCardComponent } from './detail-card.component';
import { MatCardModule } from '@angular/material/card';
import { DetailCardViewModel } from './detail-card.view-model';
import { SubscriptionSource } from 'observable-profiler';


describe('DetailCardComponent', () => {
    let component: DetailCardComponent;
    let fixture: ComponentFixture<DetailCardComponent>;

    const view: DetailCardViewModel = {
        source: new SubscriptionSource({}, 123),
        index: 123,
        stackFrames: [],
    };
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                DetailCardComponent,
            ],
            imports: [
                MatSnackBarModule,
                MatCardModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DetailCardComponent);
        component = fixture.componentInstance;
        component.view = view;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
