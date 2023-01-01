import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HomeViewComponent } from './home-view/home-view.component';
import { LeakOnclickViewComponent } from './leak/leak-onclick-view/leak-onclick-view.component';
import { LeakOninitViewComponent } from './leak/leak-oninit-view/leak-oninit-view.component';
import { LeakTakeuntilViewComponent } from './leak/leak-takeuntil-view/leak-takeuntil-view.component';
import { MarkdownComponent } from './shared/markdown/markdown.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';


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
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
