import { HomeViewComponent } from './home-view/home-view.component';
import { LeakOnclickViewComponent } from './leak/leak-onclick-view/leak-onclick-view.component';
import { LeakOninitViewComponent } from './leak/leak-oninit-view/leak-oninit-view.component';
import { LeakTakeuntilViewComponent } from './leak/leak-takeuntil-view/leak-takeuntil-view.component';


export const views = {
    home: {
        label: 'Home',
        path: 'home',
        component: HomeViewComponent,
    },
    check: {
        label: 'Check!',
        path: 'check',
    },
    leakOnInit: {
        label: 'Leak onInit',
        path: 'leak/oninit',
        component: LeakOninitViewComponent,
    },
    leakOnClick: {
        label: 'Leak onClick',
        path: 'leak/onclick',
        component: LeakOnclickViewComponent,
    },
    leakTakeUntil: {
        label: 'Leak takeUntil',
        path: 'leak/take-until',
        component: LeakTakeuntilViewComponent,
    },
    install: {
        label: 'Install',
        path: 'install',
    },
    theory: {
        label: 'How does it work?',
        path: 'theory',
    },
    bestPractices: {
        label: 'Best Practices',
        path: 'best-practices',
    },
} as const;


export const menu = [
    views.home,
    views.check,
    views.leakOnInit,
    views.leakOnClick,
    views.leakTakeUntil,
    /*
    views.install,
    views.theory,
    views.bestPractices,
    */
];
