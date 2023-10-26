import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCardComponent } from './help-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

describe('HelpCardComponent', () => {
    let component: HelpCardComponent;
    let fixture: ComponentFixture<HelpCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                HelpCardComponent,
            ],
            imports: [
                MatIconModule,
                MatCardModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HelpCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
