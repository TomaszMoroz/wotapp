Aby splash screen PWA działał na iOS:

1. Skopiuj zawartość pliku _splash-meta.html do sekcji <head> w public/index.html.
2. Upewnij się, że pliki PNG w icons/pwa/ios/ odpowiadają rozdzielczościom urządzeń, które chcesz wspierać.
3. Dla najlepszych efektów dodaj splash screeny w typowych rozdzielczościach i proporcjach (np. 640x1136, 750x1334, 1125x2436, 1242x2208, 1536x2048, 2048x2732, 1668x2224, 1668x2388, 828x1792, 1242x2688, 1536x2048, 2048x2732).
4. Przykład tagu:
<link rel="apple-touch-startup-image" href="icons/pwa/ios/640x1136.png" media="(device-width: 320px) and (device-height: 568px)">

Obecnie wygenerowane tagi są dla rozmiarów plików obecnych w katalogu ios/.