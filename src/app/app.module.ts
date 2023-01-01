import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import { LeakOninitViewComponent } from './leak/leak-oninit-view/leak-oninit-view.component';
import { LeakOnclickViewComponent } from './leak/leak-onclick-view/leak-onclick-view.component';
import { LeakTakeuntilViewComponent } from './leak/leak-takeuntil-view/leak-takeuntil-view.component';
import { MarkdownComponent } from './shared/markdown/markdown.component';
import { HomeViewComponent } from './home-view/home-view.component';


@NgModule({
    declarations: [
        AppComponent,
        LeakOninitViewComponent,
        LeakOnclickViewComponent,
        LeakTakeuntilViewComponent,
        MarkdownComponent,
        HomeViewComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
