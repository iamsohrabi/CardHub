# CardHub
Bank Card Manager app built with Angular and Ionic – securely add, view, edit, and delete bank cards. Designed specifically for Iranian banks with mobile-friendly interface.


### 1. Overview
The Bank Card Manager is a mobile app that helps users organize their debit/credit cards. It provides a secure, offline-first experience for storing card details (with masking for sensitive info like full card numbers and CVV). Users can quickly view cards, search by name or type, and perform CRUD operations. The app emphasizes privacy—no data is shared externally without user consent.

- **Target Platforms**: iOS, Android (via Ionic's hybrid build).
- **Key Goals**: Simple navigation, secure local storage, responsive design.
- **Assumptions**: Offline functionality using local storage; no real payment processing (focus on management only).

### 2. Features
- **Core CRUD Operations**:
  - Add a new card (name, card number, expiry date, CVV, card type: debit/credit/other).
  - View list of cards with masked details (e.g., **** **** **** 1234).
  - Edit or delete existing cards.
- **Search & Filter**: Search by cardholder name or filter by type (debit/credit).
- **Dashboard**: Home screen showing total cards, recent additions, and quick actions.
- **Security**: PIN/biometric lock for app access; sensitive fields masked and encrypted in storage.
- **Additional**:
  - Export cards to PDF (optional, using Ionic Native plugins).
  - Reminders for expiring cards (using local notifications via Ionic Capacitor).
  - Dark/Light mode toggle.

### 3. Tech Stack
- **Framework**: Angular 17+ (for component-based architecture, routing, and services).
- **UI Library**: Ionic 7+ (provides mobile-optimized components like ion-list, ion-card, ion-button; supports Material Design or iOS themes).
- **Build Tool**: Ionic CLI for scaffolding; Capacitor for native plugins (e.g., Secure Storage, Biometrics).
- **State Management**: NgRx or Angular Signals (for simple apps; use RxJS Observables for data flow).
- **Storage**: Ionic Storage (wrapper around SQLite or IndexedDB) with encryption via Capacitor Secure Storage plugin.
- **Other Libraries**:
  - Forms: Reactive Forms for validation.
  - HTTP: Angular HttpClient (if integrating a backend later).
  - UI Enhancements: Ionicons for icons; Moment.js or date-fns for date handling.
- **Development Tools**: VS Code, Angular CLI, Ionic CLI.

### 4. Architecture
The app follows Angular's modular structure with Ionic's page-based navigation. Use lazy-loading for performance.

#### Project Structure
```
src/
├── app/
│   ├── core/                  # Shared services, guards, interceptors
│   │   ├── services/
│   │   │   ├── card.service.ts  # Handles CRUD logic
│   │   │   ├── storage.service.ts # Secure local storage
│   │   │   └── auth.service.ts   # PIN/biometric auth
│   │   ├── guards/
│   │   │   └── auth.guard.ts     # Protects routes
│   │   └── interceptors/
│   │       └── error.interceptor.ts
│   ├── shared/                 # Reusable components/modules
│   │   ├── components/
│   │   │   ├── card-item.component.ts  # Reusable card display
│   │   │   └── search-bar.component.ts
│   │   └── pipes/
│   │       └── mask.pipe.ts     # Masks card numbers (e.g., **** **** **** 1234)
│   ├── features/               # Feature modules (lazy-loaded)
│   │   ├── dashboard/
│   │   │   ├── dashboard.page.ts/html/scss
│   │   │   └── dashboard-routing.module.ts
│   │   ├── cards/
│   │   │   ├── cards.page.ts/html/scss  # List view
│   │   │   ├── add-edit-card.page.ts/html/scss
│   │   │   └── cards.module.ts
│   │   └── settings/
│   │       └── settings.page.ts/html/scss
│   ├── app.component.ts
│   ├── app-routing.module.ts   # Root routing with Ionic nav
│   └── app.module.ts
├── assets/                     # Images, icons
├── environments/               # Config (dev/prod)
└── theme/                      # Ionic variables (colors, fonts)
```

#### Key Components & Services
- **Components**:
  - `DashboardPage`: Shows summary (e.g., ion-grid with stats cards).
  - `CardsPage`: List of cards using `ion-list` and `card-item` component.
  - `AddEditCardPage`: Modal or full page for form input (uses `ion-item`, `ion-input`, `ion-datetime`).
  - `CardItemComponent`: Displays a single card (masked number, expiry, type badge).
  - `SearchBarComponent`: Custom search with `ion-searchbar`.
- **Services**:
  - `CardService`: Manages card data (interface: `Card { id: string; name: string; number: string; expiry: Date; cvv: string; type: 'debit' | 'credit'; }`).
    - Methods: `getAll()`, `add(card)`, `update(id, card)`, `delete(id)`, `search(query)`.
  - `StorageService`: Abstracts Ionic Storage for CRUD with encryption.
  - `AuthService`: Handles app lock (PIN input via `ion-input type="password"`, biometrics via Capacitor plugin).
- **Routing** (app-routing.module.ts):
  ```typescript
  const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'cards', loadChildren: () => import('./features/cards/cards.module').then(m => m.CardsModule), canActivate: [AuthGuard] },
    { path: 'settings', loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule) },
    { path: '**', redirectTo: '/dashboard' }
  ];
  ```
  Use Ionic's `NavController` for modal navigation (e.g., opening add-edit from list).

#### Data Flow
- Use Observables: `CardService.getAll()` returns `Observable<Card[]>`.
- On init, load from storage; emit changes via BehaviorSubject for real-time updates.

### 5. UI/UX Design
- **Theme**: Use Ionic's default variables.scss for a clean, banking-inspired look (primary color: blue #007bff; secure green accents).
- **Navigation**: Ionic tabs or side menu for main sections (Dashboard | Cards | Settings).
  - Example: `ion-tabs` with icons (home, card-outline, settings-outline).
- **Pages Layout**:
  - **Dashboard**: 
    - Top: Welcome header with lock/unlock button.
    - Middle: Stats cards (e.g., "5 Cards Managed" using `ion-card`).
    - Bottom: Quick buttons (Add Card, View All).
  - **Cards List**:
    - `ion-header` with search bar and filter segment (`ion-segment` for debit/credit/all).
    - `ion-content` with `ion-list` of `card-item` components.
    - Swipe actions: Edit/Delete (using Ionic's ion-item-sliding).
    - Empty state: "No cards yet. Add one!" with button.
  - **Add/Edit Card**:
    - Form with validation (required fields, card number pattern: 16 digits).
    - Masked inputs: Use custom directive for real-time masking.
    - Secure fields: CVV as password input; confirm PIN before save.
- **Responsive**: Ionic handles mobile breakpoints; test on devices via `ionic serve` or emulator.
- **Accessibility**: Add ARIA labels to inputs; use semantic Ionic components.
- **Animations**: Ionic's built-in transitions; add Lottie for loading states if needed.

Example HTML Snippet for Cards List (cards.page.html):
```html
<ion-header>
  <ion-toolbar>
    <ion-title>Cards</ion-title>
    <ion-buttons slot="end">
      <ion-button routerLink="/cards/add">Add</ion-button>
    </ion-buttons>
  </ion-toolbar>
  <app-search-bar (search)="onSearch($event)"></app-search-bar>
</ion-header>

<ion-content>
  <ion-segment [(ngModel)]="selectedType" (ionChange)="filterCards()">
    <ion-segment-button value="all">All</ion-segment-button>
    <ion-segment-button value="debit">Debit</ion-segment-button>
    <ion-segment-button value="credit">Credit</ion-segment-button>
  </ion-segment>

  <ion-list>
    <app-card-item *ngFor="let card of filteredCards" [card]="card" (edit)="editCard($event)" (delete)="deleteCard($event)"></app-card-item>
  </ion-list>
</ion-content>
```

### 6. Data Management & Security
- **Local Storage**: Use `@ionic/storage-angular` with encryption.
  - Example in StorageService:
    ```typescript
    import { Storage } from '@ionic/storage-angular';
    import { Injectable } from '@angular/core';

    @Injectable({ providedIn: 'root' })
    export class StorageService {
      constructor(private storage: Storage) {
        this.init();
      }

      async init() {
        await this.storage.create();
      }

      async set(key: string, value: any) {
        await this.storage.set(key, btoa(JSON.stringify(value))); // Simple base64 encrypt; use better crypto in prod
      }

      async get(key: string) {
        const data = await this.storage.get(key);
        return data ? JSON.parse(atob(data)) : null;
      }
    }
    ```
  - Store cards as array under 'cards' key.
- **Security Best Practices**:
  - Never store full CVV in plain text (prompt on use or avoid storing).
  - Mask card numbers: Custom pipe `{{ card.number | mask:4 }}` (shows last 4 digits).
  - App Lock: On launch, show PIN modal; integrate `@capacitor-community/biometric-auth` for Face ID/Touch ID.
  - No Backend Initially: For production, add Firebase/Auth0 for cloud sync with end-to-end encryption.
  - Compliance: Design with GDPR/PCI-DSS in mind (e.g., no logging sensitive data).


### 7. Implementation Guide
1. **Setup Project**:
   - Install: `npm install -g @ionic/cli @angular/cli`
   - Create: `ionic start bank-card-manager tabs --type=angular --capacitor`
   - Add plugins: `npm i @ionic/storage-angular @capacitor-community/secure-storage @capacitor/biometric-auth`
   - Build native: `npx cap add ios` (or android), then `npx cap sync`.

2. **Develop Step-by-Step**:
   - Scaffold pages: `ionic g page features/dashboard`, `ionic g page features/cards`, etc.
   - Generate components/services: `ng g c shared/card-item`, `ng g s core/card`.
   - Implement AuthGuard: Check if unlocked; redirect to PIN if not.
   - Add form validation in AddEditCard: Use `FormBuilder` with validators (e.g., `Validators.pattern('^\\d{16}$')` for card number).
   - Test: `ionic serve` for web; `ionic capacitor run android` for device.

3. **Mock Data** (for testing in CardService):
   ```typescript
   private cards: Card[] = [
     { id: '1', name: 'John Doe', number: '4111111111111111', expiry: new Date('12/25'), cvv: '123', type: 'credit' }
   ];
   ```

4. **Potential Extensions**:
   - Backend Integration: Use Angular HttpClient to sync with a Node.js/Express API.
   - Testing: Add Jasmine/Karma for unit tests; Cypress for E2E.
   - Deployment: Build APK/IPA with `ionic build --prod`, then distribute via app stores.

This design provides a solid, scalable foundation. If you need code for a specific part (e.g., full service implementation or wireframes), let me know! For production, consult security experts for handling real financial data.
