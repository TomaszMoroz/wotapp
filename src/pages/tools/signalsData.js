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
      'kotlina', 'grzbiet', 'szczyt', 'wąwóz', 'przełęcz', 'dolina', 'jezioro',
      'staw', 'łąka', 'bór', 'step', 'góra', 'pagórek', 'rów', 'wał',
      'urwisko', 'polana', 'ostrzega'
    ],
    okolnik: ['mapa', 'atlas', 'teren', 'planeta', 'mekka']
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
    okolnik: ['miasto', 'metropolia', 'osiedle', 'dzielnica', 'metropolis']
  },
  {
    key: 'kosmos',
    label: 'Kosmos',
    words: [
      'sputnik', 'mars', 'orion', 'neptun', 'saturn', 'uran', 'merkury',
      'kometa', 'asteroida', 'kończyk', 'apog', 'perihelium', 'planeta',
      'krokodyl', 'karuzela', 'płanetka', 'najemnica'
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
    'fala', 'sowa', 'topór', 'beret', 'kompas', 'strzała', 'żaba', 'ryba',
    'łabędź', 'żuraw', 'bocian', 'tarcza', 'mapa', 'wilcze', 'lisy', 'szczyt',
    'wiatr', 'mróz', 'szron', 'nurt', 'brzeg', 'rów', 'wał', 'wrzos',
    'dąb', 'cis', 'grab', 'bór', 'dom', 'las', 'wóz', 'lis',
    'hełm', 'łuk', 'miecz', 'sień', 'kruk', 'siew', 'śnieg', 'deszcz',
    'miara', 'typ', 'skok', 'biały', 'czarny', 'żar', 'lód', 'mgła',
    'morze', 'ocean', 'błysk', 'grom', 'siew', 'tłum', 'klan', 'mur',
    'głaz', 'skarpa', 'zygzak', 'kąt', 'punkt', 'linia'
  ],
  3: [
    'jaskółka', 'muchomor', 'granatnik', 'karabin', 'pistolet', 'bazyliszek',
    'krokodyl', 'wilkołak', 'smoczyca', 'dymówka', 'strażnik', 'komendant',
    'oficer', 'major', 'kapitan', 'generał', 'kotlina', 'dolina', 'strumień',
    'przełęcz', 'błyskawica', 'gradobicie', 'wystrzał', 'żołnierz', 'serce',
    'mostek', 'kamień', 'ogród', 'lasem',
    'żołnierz', 'porucznik', 'sierżant', 'kapral', 'starszy', 'przepustka',
    'harmonia', 'serenada', 'bombarada', 'turbina', 'akumulator', 'generator',
    'pilaster', 'magazynek', 'kaliber', 'amunicja', 'granica', 'rozruch',
    'pasowanie', 'przysięga', 'zawiadom', 'raport', 'melduń', 'kwotnik',
    'pogłoska', 'szaber', 'luksor', 'dominium', 'bastion', 'zbiornik'
  ],
  4: [
    'hippopotam', 'obserwator', 'sygnalista', 'podporucznik', 'podpułkownik',
    'radiotelegrafista', 'artylerzysta', 'radiostacja', 'karabin maszynowy',
    'błyskawiczny', 'strzelecki', 'obserwacyjny', 'przeznaczony', 'współrzędne',
    'radiotelegrafista', 'artylerzysta', 'radiostacja', 'komunikator',
    'zajezdnik', 'wodostawek', 'popieraczka', 'meldujący', 'łącznik',
    'obserwujący', 'navigujący', 'koordynujący', 'kontrolujący',
    'bezpiecznik', 'przestrzeń', 'kategorię'
  ]
}

export const PASSWORD_SYLLABLES = [2, 3, 4]

// Sygnały bliższe — sygnały wzrokowe na krótkie dystanse (ręce/pozycja)
export const NEAR_SIGNALS = [
  { text: 'Prawa ręka poziomo wyciągnięta, otwarta dłoń', icon: 'pan_tool_alt' },
  { text: 'Lewa ręka uniesiona nad głowę, dłoń otwarta', icon: 'back_hand' },
  { text: 'Obie ręce skrzyżowane na piersi', icon: 'front_hand' },
  { text: 'Prawa dłoń pionowo nad głową', icon: 'touch_app' },
  { text: 'Lewy łokieć na wysokości barku, dłoń otwarta w górę', icon: 'front_hand' },
  { text: 'Prawa dłonia przy policzku, palec wskazujący w górę', icon: 'front_hand' },
  { text: 'Obie dłonie przed sobą, kciuki w górę', icon: 'thumb_up' },
  { text: 'Prawa ręka na czole, dłoń otwarta do tyłu', icon: 'back_hand' },
  { text: 'Lewa dłonia poziomo przed sobą, palce razem', icon: 'pan_tool' },
  { text: 'Prawy łokieć na wysokości pasa, dłoń otwarta w dół', icon: 'back_hand' }
]

// Sygnał dalszy — wersja dzienna
export const FAR_DAY_COLORS = [
  { key: 'biały', hex: '#FFFFFF', border: '#9e9e9e' },
  { key: 'czerwony', hex: '#c62828', border: '#7f1d1d' },
  { key: 'niebieski', hex: '#1565c0', border: '#0d47a1' },
  { key: 'żółty', hex: '#f9a825', border: '#b07a00' },
  { key: 'zielony', hex: '#2e7d32', border: '#1b5e20' },
  { key: 'czarny', hex: '#212121', border: '#000000' }
]

export const FAR_DAY_SYMBOLS = ['krzyż', 'trójkąt', 'koło', 'pas', 'gwiazda', 'romb']

export const FAR_DAY_PLACEMENTS = [
  'na fladze przy pojeździe',
  'na masce pojazdu',
  'na polu bojowym maskowania',
  'na Znaku rozpoznawczym przy drodze',
  'na podstawie anteny'
]

// Sygnał dalszy — wersja nocna (błyski światła)
export const FAR_NIGHT_COLORS = [
  { key: 'biały', hex: '#FFFFFF' },
  { key: 'zielony', hex: '#00e676' },
  { key: 'czerwony', hex: '#ff5252' },
  { key: 'niebieski', hex: '#448aff' }
]
