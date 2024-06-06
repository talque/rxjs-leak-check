import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HomeViewComponent } from './home-view/home-view.component';
import { LeakOnclickViewComponent } from './leak/leak-onclick-view/leak-onclick-view.component';
import { LeakOninitViewComponent } from './leak/leak-oninit-view/leak-oninit-view.component';
import { LeakTakeuntilViewComponent } from './leak/leak-takeuntil-view/leak-takeuntil-view.component';
import { MarkdownComponent } from './shared/markdown/markdown.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        AppComponent,
        LeakOninitViewComponent,
        LeakOnclickViewComponent,
        LeakTakeuntilViewComponent,
        MarkdownComponent,
        HomeViewComponent,
        FooterComponent
    ],
    bootstrap: [
        AppComponent,
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
    providers: [
        MatIconRegistry, provideHttpClient(withInterceptorsFromDi())
    ],
})
export class AppModule {

    constructor(
        private readonly matIconRegistry: MatIconRegistry,
        private readonly domSanitizer: DomSanitizer, 
    ) {  
        this.matIconRegistry.addSvgIcon(
            'github',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/github.svg'));
    }
}
