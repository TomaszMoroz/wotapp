// Bazy danych generatora kryptonimów, haseł i sygnałów

export const HIERARCHY_LEVELS = [
  'Wyższy szczebel',
  'Równorzędny',
  'Niższy szczebel',
  'Okoliczny (sąsiedni)'
]

export const CALLSIGN_THEMES = [
  {
    key: 'zwierzeta',
    label: 'Zwierzęta',
    words: [
      'wilk', 'szakal', 'orzeł', 'sokół', 'lis', 'dzik', 'jeleń', 'sarna',
      'żmija', 'borsuk', 'ryś', 'łoś', 'żuraw', 'bocian', 'jastrząb', 'puchacz',
      'myszołów', 'kuna', 'tur', 'wół', 'żaba', 'ryba', 'łabędź', 'koń',
      'osioł', 'muł', 'daniel', 'kocur', 'pies'
    ],
    okolnik: ['zoo', 'cyrk', 'akwarium', 'hodowla', 'schronisko', 'stado']
  },
  {
    key: 'rosliny',
    label: 'Rośliny',
    words: [
      'jałowiec', 'sosna', 'dąb', 'brzoza', 'leszczyna', 'jarzębina', 'cis',
      'modrzew', 'świerk', 'lipa', 'grab', 'topola', 'chrzan', 'pokrzywa',
      'barszcz', 'ruta', 'chmiel', 'żurawina', 'wrzos', 'paproć'
    ],
    okolnik: ['ogród', 'park', 'las', 'plantacja', 'szkołka', 'arboretum']
  },
  {
    key: 'pogoda',
    label: 'Pogoda i niebo',
    words: [
      'chmura', 'burza', 'piorun', 'mgła', 'deszcz', 'śnieg', 'mróz',
      'tęcza', 'zorza', 'kometa', 'horyzont', 'słońce', 'księżyc', 'gwiazda',
      'wiatr', 'szron', 'zawierucha', 'sierp'
    ],
    okolnik: ['niebo', 'firmament', 'atmosfera', 'klimat', 'obserwatorium']
  },
  {
    key: 'krajobraz',
    label: 'Krajobraz',
    words: [
      'kotlina', 'grzbiet', 'szczyt', 'wąwóz', 'przełęcz', 'jezioro',
      'staw', 'łąka', 'bór', 'step', 'góra', 'pagórek', 'rów', 'wał',
      'urwisko', 'polana', 'ostrzega'
    ],
    okolnik: ['mapa', 'atlas', 'teren', 'planeta']
  },
  {
    key: 'woda',
    label: 'Woda i nurt',
    words: [
      'fala', 'nurt', 'brzeg', 'zalew', 'rzeka', 'strumień',
      'wir', 'bystrze', 'zatoka', 'prąd', 'mielizna', 'wodospad',
      'mokradło', 'bagno', 'otoczka', 'trzcina'
    ],
    okolnik: ['ocean', 'morze', 'hydrosfera', 'zbiornik', 'akwaria']
  },
  {
    key: 'wyposazenie',
    label: 'Wyposażenie i broń',
    words: [
      'hełm', 'pancerz', 'tarcza', 'kusza', 'łuk', 'strzała', 'miecz',
      'topór', 'taran', 'bagnet', 'kompas', 'lorneta', 'mapa', 'beret',
      'opaska', 'sznurówka', 'busola', 'krzyżówka'
    ],
    okolnik: ['arsenał', 'magazyn', 'zbrojownia', 'sklep', 'skarbiec']
  },
  {
    key: 'miasto',
    label: 'Miasto i budowle',
    words: [
      'rynek', 'port', 'most', 'wieża', 'zamek', 'kościół', 'dom', 'hotel',
      'klub', 'teatr', 'kino', 'szkoła', 'kaplica', 'pałac', 'bunkier',
      'fort', 'bastion', 'tama', 'molo', 'planeta'
    ],
    okolnik: ['miasto', 'metropolia', 'osiedle', 'dzielnica']
  },
  {
    key: 'kosmos',
    label: 'Kosmos',
    words: [
      'sputnik', 'mars', 'orion', 'neptun', 'saturn', 'uran', 'merkury',
      'kometa', 'asteroida', 'apog', 'perihelium', 'planeta',
      'krokodyl', 'karuzela'
    ],
    okolnik: ['galaktyka', 'kosmos', 'układ', 'niebo', 'astrologia']
  },
  {
    key: 'sport',
    label: 'Sport i atletyka',
    words: [
      'piłka', 'rakieta', 'bramka', 'bokser', 'sztangista', 'biathlon',
      'triatlon', 'sprint', 'hokeista', 'maraton', 'wyścig', 'stajnia',
      'muzyka', 'ścieżka', 'tor', 'arena'
    ],
    okolnik: ['stadion', 'arena', 'klub', 'tor', 'trybuny', 'kapielisko']
  },
  {
    key: 'jedzenie',
    label: 'Jedzenie i spiżarnia',
    words: [
      'piernik', 'chleb', 'miód', 'sól', 'pieprz', 'mleko', 'kalafior',
      'pomarańcz', 'banan', 'kokos', 'melon', 'brukiew', 'cukier',
      'kasza', 'mąka', 'sos', 'majeranek', 'imbir', 'anyż'
    ],
    okolnik: ['spiżarnia', 'kuchnia', 'stołówka', 'lodówka', 'piekarnia', 'bufet']
  },
  {
    key: 'muzyka',
    label: 'Muzyka i orkiestra',
    words: [
      'flet', 'trąbka', 'gitara', 'perkusja', 'harmonia', 'fuga', 'aria',
      'waltz', 'serenada', 'bombarada', 'tamburyn', 'cytra', 'mandolina',
      'soprana', 'bas', 'oboj', 'wiolina'
    ],
    okolnik: ['orkiestra', 'kapela', 'zespół', 'chór', 'akademia', 'filharmonia']
  },
  {
    key: 'legendy',
    label: 'Legendy i mity',
    words: [
      'smok', 'wampir', 'bazyliszek', 'grif', 'pegaz', 'wilkołak', 'demon',
      'hydra', 'minotaur', 'centaur', 'kraken', 'druid', 'druidka',
      'behemot', 'lilith', 'gorgon'
    ],
    okolnik: ['legendarny', 'mitologia', 'saga', 'ballada', 'almanach']
  }
]

// Hasło i odzew — słowa pogrupowane wg liczby sylab (2-4)
export const PASSWORD_WORDS = {
  2: [
    'fala', 'zalew', 'bystrze', 'bagno', 'mokra', 'strumień', 'przełęcz', 'wąwóz',
    'łąka', 'stepa', 'wyspa', 'kanał', 'droga', 'ścieżka', 'zamek', 'komin',
    'mostek', 'kawał', 'kupa', 'kilof', 'burza', 'piorun', 'słońce', 'chmura',
    'tęcza', 'para', 'zima', 'lato', 'wiosna', 'jesień', 'opad', 'marzec',
    'tarcza', 'kusza', 'strzała', 'topór', 'taran', 'bagnet', 'kompas', 'mapa',
    'beret', 'uprząż', 'torba', 'narty', 'wiosło', 'pogoń', 'wagon', 'flota',
    'pojazd', 'czoło', 'maska', 'kurtka', 'pomoc', 'zastrzał', 'rysik', 'sowa',
    'żaba', 'ryba', 'łabędź', 'żuraw', 'bocian', 'szakal', 'osioł', 'daniel',
    'kocur', 'sarna', 'jeleń', 'kuna', 'orzeł', 'sokół', 'borsuk', 'puma',
    'wilcze', 'lisy', 'miara', 'biały', 'czarny', 'morze', 'skarpa', 'zygzak',
    'linia', 'rycerz', 'obrys', 'zarys', 'wilga', 'nikiel', 'wicker', 'kwoka',
    'karma', 'wykwit', 'podbór', 'kontur', 'detal', 'jasło', 'wykrot', 'ślusarz',
    'ława', 'przedpol', 'tyczka', 'okno', 'brama', 'wiata', 'okap', 'kołek',
    'żagiel', 'miotła', 'iskra', 'profil', 'kwarta', 'mitra', 'kapwa', 'przekreśl',
    'meczet', 'dzwignia', 'strażnik', 'major', 'żołnierz', 'sierżant', 'kapral', 'starszy',
    'raport', 'melduń', 'kwotnik', 'szaber', 'luksor', 'dominium', 'bastion', 'zbiornik',
    'kwintal', 'piechur', 'szofer', 'łącznik', 'szwadron', 'szarża', 'rozruch', 'worek',
    'sprzęgło', 'pompa', 'silnik', 'wystrzał', 'serce', 'kamień', 'ogród', 'czapla',
    'wieża', 'baszta', 'spichlerz', 'dzbanek', 'kuźnia', 'bizon', 'gorgon', 'centaur',
    'kraken', 'hydra', 'druid', 'lilith', 'brukiew', 'banan', 'kokos', 'melon',
    'imbir', 'anyż', 'balon', 'pieczęć', 'skoczek', 'garaz', 'kocioł', 'kwadrat',
    'akwarium', 'planarium', 'wachta', 'służba'
  ],
  3: [
    'mielizna', 'kotlina', 'polana', 'urwisko', 'ostrzega', 'pagórek', 'dmuchawa', 'busola',
    'walizka', 'kuferek', 'eskadra', 'wagonik', 'kilowa', 'ocean', 'drabina', 'plecionka',
    'zabawa', 'dachówka', 'ordynka', 'sutania', 'amora', 'podwórko', 'jaskółka', 'muchomor',
    'granatnik', 'karabin', 'pistolet', 'wilkołak', 'smoczyca', 'dymówka', 'komendant', 'oficer',
    'kapitan', 'generał', 'porucznik', 'przepustka', 'przysięga', 'zawiadom', 'pogłoska', 'kawaler',
    'bezpiecznik', 'zajezdnik', 'skarbowy', 'naprawa', 'kaliber', 'granica', 'dymnica', 'torebka',
    'turbina', 'pilaster', 'odpowietrz', 'rozdzielnia', 'przekaźnik', 'mechanizm', 'wysepka', 'sadzawka',
    'dzielnica', 'osiedle', 'miasteczko', 'powietrze', 'krokodyl', 'flamingo', 'biedronka', 'bufetka',
    'minotaur', 'druidka', 'behemot', 'kalafior', 'harmonia', 'zestawka', 'kuchenka', 'karnawał',
    'kalendarz', 'hurtownia', 'piekarnia', 'wciągarka', 'tokarka', 'osiłek', 'ozdoba', 'zoopark',
    'dowódca', 'kompania', 'dywizja', 'zabezpiecz', 'strzelecki', 'współrzędne', 'przychodnia', 'kwartalnik',
    'uczelnia', 'otoczka', 'nakrycie', 'przychylny', 'lupina', 'sposobny', 'telefon', 'hełmofon',
    'kierowca', 'meldunek', 'przeciwnik', 'sojusznik', 'zwiadowca', 'strzelnica', 'samolot', 'szybowiec',
    'rakieta', 'naboje', 'pododdział', 'bateria', 'dywizjon', 'batalion', 'garnizon', 'koszary',
    'stołówka', 'kantyna', 'magazyn', 'kwatera', 'schronisko', 'piwnica', 'cegielnia', 'hucisko',
    'ślusarnia', 'bulwary', 'fontanna', 'kolumna', 'rotunda', 'wartownik', 'celownik', 'barometr',
    'dynamit', 'antena', 'wykrywacz', 'nasłuchnik', 'detektor', 'pieczątka', 'dokument', 'rykoszet',
    'piechota', 'budynek', 'cysterna', 'bariera', 'rogatka', 'karetka', 'rękojeść', 'lokator',
    'wypadek', 'podnośnik', 'transporter', 'przenośnia', 'tankowiec', 'pompownia', 'instrukcja', 'wahadło',
    'wysięgnik'
  ],
  4: [
    'opatrunek', 'obserwacja', 'doniesienie', 'stanowisko', 'kawalkada', 'rowerzysta', 'helikopter', 'awionetka',
    'karabinek', 'esplanada', 'promenada', 'kolumnada', 'amfiteatr', 'ubikacja', 'operator', 'regulator',
    'separacja', 'motorówka', 'brygadówka', 'karawana', 'posterunek', 'dowodzenie', 'rozpoznanie', 'ostrzeganie',
    'kawaleria', 'artyleria', 'gąsienica', 'sanitarka', 'ogrodzenie', 'balustrada', 'rezerwuar', 'regulamin',
    'regulacja', 'instalator', 'kamizelka', 'bazyliszek', 'podsuwanie', 'magazynek', 'amunicja', 'generator',
    'hamowanie', 'zasilanie', 'błyskawica', 'gradobicie', 'hippopotam', 'majeranek', 'serenada', 'bombarada',
    'republika', 'obserwator', 'sygnalista', 'podporucznik', 'podpułkownik', 'radiostacja', 'wodostawek', 'popieraczka',
    'meldujący', 'kategorię', 'przeznaczony', 'przyszłościowy', 'rozpoznawczy', 'transportowy', 'błyskawiczny', 'observatorium',
    'laboratorium', 'nasieniarnia', 'elektryczny', 'hydrauliczny'
  ]
}

export const PASSWORD_SYLLABLES = [2, 3, 4]

// Sygnały bliższe — umówione gesty rozpoznawcze (swoi/obcy), jedna ręka, broń w drugiej.
// WOT: patrol leśny, punkt kontrolny, powrót na stanowisko — gesty dyskretne, dobrze
// widoczne na 20–100 m, trudne do podszycia, szybkie do wykonania pod stresem.
export const NEAR_SIGNALS = [
  { name: 'Dłoń na czapce', text: 'prawa dłoń przyciśnięta do czapki/hełmu, wstrzymana 2 s', icon: 'front_hand' },
  { name: 'Pięść na piersi', text: 'prawa pięść przyciśnięta do lewej strony piersi', icon: 'front_hand' },
  { name: 'Otwarta dłoń w górze', text: 'prawa dłoń otwarta uniesiona do wysokości twarzy, wstrzymana', icon: 'back_hand' },
  { name: 'Dotknięcie barku', text: 'trzykrótnie dotknięcie lewego barku prawą dłonią', icon: 'touch_app' },
  { name: 'Łokieć odstawiony', text: 'prawa dłoń na biodrze, łokieć odstawiony na bok', icon: 'accessibility_new' },
  { name: 'Dłoń przy twarzy', text: 'prawa dłoń otwarta przy prawym policzku', icon: 'face' },
  { name: 'Trzy palce', text: 'prawa dłoń uniesiona, trzy wyprostowane palce', icon: 'pan_tool' },
  { name: 'Pięść przy boku', text: 'prawa pięść zaciśnięta przy prawym biodrze, łokieć zgięty', icon: 'front_hand' },
  { name: 'Poprawienie czapki', text: 'gest poprawiania czapki prawą ręką, dwukrotny', icon: 'emoji_people' },
  { name: 'Dłoń na przedramię', text: 'prawa dłoń położona na lewym przedramieniu', icon: 'back_hand' },
  { name: 'Kciuk do góry', text: 'prawa pięść z kciukiem w górę uniesiona do wysokości barku', icon: 'thumb_up' },
  { name: 'Dotknięcie czoła', text: 'dwoma palcami prawej dłoni dotknięcie środka czoła', icon: 'touch_app' },
  { name: 'Ręka na naramienniku', text: 'prawa dłoń chwytająca lewy naramiennik/pasek oporządzenia', icon: 'front_hand' },
  { name: 'Krótkie uniesienie ramienia', text: 'prawe ramię uniesione ukośnie i opuścienie — dwukrotny ruch', icon: 'pan_tool' },
  { name: 'Zasłona przed słońcem', text: 'prawa dłoń na czole jak zasłona przed słońcem, wstrzymana 2 s', icon: 'wb_sunny' },
  { name: 'Oko przykryte', text: 'prawa dłoń przykrywająca lewe oko, wstrzymana 2 s', icon: 'visibility_off' },
  { name: 'Gest okularów', text: 'gest prostowania okularów dwoma palcami prawej dłoni', icon: 'visibility' },
  { name: 'Palec przy uchu', text: 'palec wskazujący prawej dłoni przy lewym uchu', icon: 'hearing' },
  { name: 'Chwyt za rękaw', text: 'lewa dłoń chwytająca prawy rękaw kurtki, wstrzymana', icon: 'front_hand' },
  { name: 'Dłoń z okna pojazdu', text: 'prawa dłoń otwarta wystawiona przez okno pojazdu (patrol kołowy)', icon: 'back_hand' }
]

// Sygnał dalszy — wersja dzienna. WOT/łasy: kierunkowe i krótkotrwałe na początku
// (najdyskretniejsze), markery statyczne i środki sygnalizacyjne (dym, racza) na końcu.
export const FAR_DAY_SIGNALS = [
  { text: '3× krótkie odbicie lusterka sygnalizacyjnego w stronę swoich', icon: 'flare' },
  { text: '2× długie odbicie lusterka — pauza — 2× krótkie', icon: 'flare' },
  { text: 'latarka kierowana na swoich: 3× krótki błysk', icon: 'flashlight_on' },
  { text: 'latarka kierowana na swoich: 2× długi — 1× krótki', icon: 'flashlight_on' },
  { text: '3× pionowe uniesienie chusty/płachty nad głową', icon: 'flag' },
  { text: '3× okrężny ruch chustą/ręcznikiem nad głową', icon: 'rotate_right' },
  { text: 'chusta uniesiona nad głowę i wstrzymana 3 s', icon: 'flag' },
  { text: 'podniesienie broni oburącz nad głowę, wstrzymane 3 s', icon: 'waving_hand' },
  { text: '2× wymach ramieniem z chustą na bok — wyraźny sylwetkowy gest', icon: 'waving_hand' },
  {
    text: 'pomarańczowy panel rozpoznawczy rozłożony na punkcie',
    chips: [{ hex: '#ef6c00', border: '#b34700', count: 1 }]
  },
  {
    text: 'pomarańczowy panel/płachta na dachu pojazdu',
    chips: [{ hex: '#ef6c00', border: '#b34700', count: 1 }]
  },
  {
    text: 'granat dymny: zielony dym na punkcie/stanowisku',
    chips: [{ hex: '#2e7d32', border: '#1b5e20', count: 1, round: true }]
  },
  {
    text: 'granat dymny: pomarańczowy dym na punkcie/stanowisku',
    chips: [{ hex: '#ef6c00', border: '#b34700', count: 1, round: true }]
  },
  {
    text: 'granat dymny: fioletowy dym na punkcie/stanowisku',
    chips: [{ hex: '#6a1b9a', border: '#4a148c', count: 1, round: true }]
  },
  { text: '1× racza zielona', chips: [{ hex: '#2e7d32', border: '#1b5e20', count: 1 }] },
  { text: '1× racza czerwona', chips: [{ hex: '#c62828', border: '#7f1d1d', count: 1 }] },
  { text: '2× racza zielona', chips: [{ hex: '#2e7d32', border: '#1b5e20', count: 2 }] },
  {
    text: '1× racza biała — 1× racza czerwona',
    chips: [{ hex: '#fafafa', border: '#9e9e9e', count: 1 }, { hex: '#c62828', border: '#7f1d1d', count: 1 }]
  }
]

// Sygnał dalszy — wersja nocna. Podstawa: latarka kierunkowa (krótki/długi jak Morse).
// Alternatywy: filtr czerwony (dyskretny, nie psuje noktowizji), cyalume, racze.
export const FAR_NIGHT_SIGNALS = [
  { seq: ['krótki', 'długi'], text: 'latarka: krótki — długi' },
  { seq: ['długi', 'krótki'], text: 'latarka: długi — krótki' },
  { seq: ['krótki', 'krótki', 'długi'], text: 'latarka: krótki — krótki — długi' },
  { seq: ['krótki', 'długi', 'krótki'], text: 'latarka: krótki — długi — krótki' },
  { seq: ['długi', 'krótki', 'długi'], text: 'latarka: długi — krótki — długi' },
  { seq: ['krótki', 'krótki', 'krótki'], text: 'latarka: 3× krótki' },
  { seq: ['długi', 'długi', 'krótki'], text: 'latarka: długi — długi — krótki' },
  { seq: ['długi', 'krótki', 'krótki'], text: 'latarka: długi — krótki — krótki' },
  { seq: ['krótki', 'długi', 'długi'], text: 'latarka: krótki — długi — długi' },
  { seq: ['krótki', 'krótki', 'długi', 'krótki'], text: 'latarka: krótki — krótki — długi — krótki' },
  {
    seq: ['krótki', 'krótki', 'krótki'],
    color: '#ff5252',
    text: 'latarka z filtrem czerwonym: 3× krótki'
  },
  {
    seq: ['długi', 'krótki', 'krótki'],
    color: '#ff5252',
    text: 'latarka z filtrem czerwonym: długi — krótki — krótki'
  },
  {
    text: '3× okrężny ruch cyalume zielone nad głową',
    chips: [{ hex: '#00e676', border: '#00c853', count: 1, round: true, glow: true }]
  },
  {
    text: 'cyalume zielone uniesione i wstrzymane 3 s',
    chips: [{ hex: '#00e676', border: '#00c853', count: 1, round: true, glow: true }]
  },
  {
    text: 'cyalume niebieskie uniesione i wstrzymane 3 s',
    chips: [{ hex: '#448aff', border: '#2962ff', count: 1, round: true, glow: true }]
  },
  {
    text: '2× cyalume zielone — 1× cyalume czerwone (uniesione kolejno)',
    chips: [{ hex: '#00e676', border: '#00c853', count: 2, round: true, glow: true }, { hex: '#ff5252', border: '#d32f2f', count: 1, round: true, glow: true }]
  },
  { text: '1× racza zielona', chips: [{ hex: '#2e7d32', border: '#1b5e20', count: 1 }] },
  { text: '1× racza czerwona', chips: [{ hex: '#c62828', border: '#7f1d1d', count: 1 }] },
  {
    text: '2× racza biała (oświetlenie + rozpoznanie)',
    chips: [{ hex: '#fafafa', border: '#9e9e9e', count: 2 }]
  }
]
