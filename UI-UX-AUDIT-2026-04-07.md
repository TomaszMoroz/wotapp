# Audyt UI/UX – WOT PWA
**Data:** 2026-04-07

## 1. Executive summary
Aplikacja jest funkcjonalnie mocna, ale warstwa wizualna nie działa jak spójny system projektowy. Główny problem nie leży w pojedynczych ekranach, tylko w tym, że stylowanie jest rozproszone po wielu stronach i naprawiane lokalnie.

### Najważniejszy wniosek
Dark mode nie jest „zaprojektowany”, tylko „łatany”. To powoduje:
- ciemne fonty na ciemnym tle,
- niespójne kolory kart i przycisków,
- różne zachowanie tych samych komponentów na różnych podstronach,
- trudniejszy rozwój i regresje przy każdej zmianie.

## 2. Twarde sygnały z kodu
Podczas przeglądu `wotapp/src` wykryto:
- **179** użyć inline stylów (`style=` / `:style=`)
- **637** użyć `!important`
- **1420** bezpośrednich wartości kolorów hex

To jest wyraźny sygnał, że aplikacji brakuje centralnego systemu tokenów i zasad UI.

## 3. Kluczowe problemy

### A. Dark mode jest niespójny i podatny na błędy
**Objawy:**
- wiele stron wymusza kolory ręcznie zamiast korzystać z jednego źródła prawdy,
- część ekranów ma własne poprawki tylko dla dark mode,
- ten sam komponent wygląda inaczej zależnie od widoku.

**Przykłady:**
- `src/pages/IndexPage.vue` – tytuł w dark mode ma lokalne nadpisania i zielone/dark odcienie,
- `src/pages/shooting/ShootingPage.vue` – liczne `:style` zależne od `$q.dark.isActive`,
- `src/components/BackNav.vue` + wiele stron z `BackNav color="black"` – ryzyko słabej czytelności w ciemnym motywie,
- `src/layouts/MainLayout.vue` oraz `src/css/app.css` – wiele nakładających się reguł globalnych dla `.q-card`, `.q-page`, `.q-header`.

**Ocena:** krytyczne.

### B. Brak jednego design systemu
Aktualnie kolory, promienie, cienie, marginesy i typografia są definiowane per-ekran. W praktyce każda nowa strona tworzy własny mini-styl.

**Skutki:**
- brak spójności,
- wysokie koszty utrzymania,
- trudność w skalowaniu aplikacji.

**Ocena:** krytyczne.

### C. Nawigacja jest przeciążona poznawczo
`src/layouts/MainLayout.vue` ma bardzo rozbudowany drawer, długie etykiety i duplikaty wybranych pozycji (np. część narzędzi pojawia się wielokrotnie). To zwiększa czas znalezienia funkcji i osłabia UX na mobile.

**Ocena:** wysokie.

### D. Hierarchia wizualna jest nierówna
Na wielu ekranach kafle są podobne do siebie wagą wizualną, przez co użytkownik nie widzi od razu:
- co jest najważniejsze,
- co jest akcją główną,
- co jest informacją pomocniczą.

Dotyczy to m.in. `IndexPage.vue`, `ToolsPage.vue`, `TcccPage.vue`, `ReportsPage.vue`.

**Ocena:** wysokie.

### E. Accessibility i mobile ergonomia wymagają poprawy
- kontrast tekstu jest niestabilny,
- część opisów i chipów ma zbyt niski priorytet wizualny,
- layouty mają duże odstępy i stałe wysokości kart, przez co na mniejszych ekranach treść oddycha nierówno,
- interakcje nie są projektowane według jednego standardu focus/hover/pressed.

**Ocena:** wysokie.

## 4. Root cause
Główna przyczyna problemów to połączenie trzech rzeczy:
1. **rozproszone stylowanie per-strona**,
2. **duża liczba lokalnych override’ów i `!important`**,
3. **brak semantycznych tokenów UI** (`surface`, `text-primary`, `text-muted`, `border-subtle`, `accent`, `danger`, itp.).

## 5. Docelowy kierunek przebudowy
Rekomenduję przebudowę w stylu:
**„Google/GA dark clarity + nowoczesny military minimalism”**

Czyli:
- **light theme zostaje spokojny i czysty**, bez rewolucji,
- **dark theme** opiera się na czytelnych powierzchniach jak w Google / Material / GA:
  - `bg`: `#202124`
  - `surface`: `#292a2d`
  - `surface-2`: `#303134`
  - `text`: `#e8eaed`
  - `muted`: `#9aa0a6`
  - `accent`: `#a8c7fa`
- militarny zielony i khaki pełnią rolę **akcentu marki**, a nie bazowego koloru długich tekstów.

## 6. Proponowana architektura UI

### 6.1 Design tokens (fundament)
Wydzielić centralny zestaw tokenów, np. w:
- `src/css/tokens.css`
- `src/css/app.css`

Zdefiniować semantykę:
- `--app-bg`
- `--app-surface`
- `--app-surface-2`
- `--app-border`
- `--app-text`
- `--app-text-muted`
- `--app-accent`
- `--app-success`
- `--app-warning`
- `--app-danger`
- `--radius-sm/md/lg/xl`
- `--space-1..6`
- `--shadow-1..3`

### 6.2 Wspólne komponenty bazowe
Zamiast stylować każdą stronę oddzielnie, warto ujednolicić 5 wzorców:
- `AppPageHeader`
- `AppSectionCard`
- `AppFeatureTile`
- `AppEmptyState`
- `AppStatusChip`

To usunie większość powielanego CSS z `IndexPage.vue`, `ToolsPage.vue`, `ShootingPage.vue`, `EmergencyPage.vue`, `AbcPage.vue` itd.

### 6.3 Nowa nawigacja
#### Mobile
- prostszy `top app bar`,
- krótsze etykiety,
- sekcje grupowane akordeonami,
- opcjonalnie dolny pasek dla 3–4 najważniejszych obszarów:
  - `Start`
  - `Narzędzia`
  - `Szkolenie`
  - `Więcej`

#### Desktop
- drawer zostaje, ale zyskuje:
  - wyraźne grupy,
  - mniej duplikatów,
  - lepszy stan aktywny,
  - przypięte „Moje skróty” na górze.

### 6.4 Hierarchia treści
Każdy ekran powinien mieć spójny układ:
1. **nagłówek strony**,
2. **krótki opis / status**,
3. **główna akcja**,
4. **karty sekcji**,
5. **dodatkowe materiały**.

Obecnie za dużo elementów ma tę samą wagę wizualną.

## 7. Quick wins (największy efekt przy małym koszcie)
1. **Usunąć ręczne `color="black"` z nawigacji wstecz** i oprzeć `BackNav` o tokeny.
2. **Ujednolicić tytuły, opisy i karty** na dashboardzie, tools i shooting.
3. **Wyrzucić per-page dark patches** tam, gdzie mogą działać globalne tokeny.
4. **Ujednolicić stany aktywne w drawerze**.
5. **Zastąpić agresywne `!important`** warstwą semantycznych klas.

## 8. Roadmapa przebudowy

### Etap 1 – Fundament (1–2 dni)
- centralne tokeny kolorów i spacingu,
- naprawa kontrastu dark mode,
- refaktor `BackNav`, `MainLayout`, global cards/buttons/inputs,
- zero zmian w logice biznesowej.

### Etap 2 – Nawigacja i dashboard (1–2 dni)
- uproszczenie drawer/menu,
- lepszy dashboard i kafle sekcji,
- spójna hierarchia i CTA.

### Etap 3 – Strony funkcjonalne (2–4 dni)
- `Tools`, `Equipment`, `Reports`, `TCCC`, `Shooting`, `Emergency`,
- jedna biblioteka kart, formularzy i stanów pustych.

### Etap 4 – Polish i accessibility (1–2 dni)
- focus states,
- kontrast WCAG,
- touch targets,
- animacje micro-interaction,
- testy na mobile.

## 9. Priorytet wdrożenia
Jeśli celem jest szybki skok jakości, zacząłbym od:
1. `src/css/app.css`
2. `src/layouts/MainLayout.vue`
3. `src/components/BackNav.vue`
4. `src/pages/IndexPage.vue`
5. `src/pages/tools/ToolsPage.vue`
6. `src/pages/shooting/ShootingPage.vue`

## 10. Rekomendacja końcowa
Tak — ta aplikacja ma bardzo dobry potencjał, ale potrzebuje **przejścia z „stylowania ekranów” na „system projektowy”**. Bez tego każdy kolejny ekran będzie powielał obecne problemy.

Najlepsza ścieżka to **ewolucyjna przebudowa**:
- bez ruszania logiki,
- bez psucia jasnego motywu,
- z priorytetem na spójny dark mode i nowoczesną, profesjonalną hierarchię UI.
