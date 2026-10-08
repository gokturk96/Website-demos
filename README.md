# KaleIT – Website-Demos

Demo-Websites, die [KaleIT](https://kale-it.tr) für Kundenangebote baut.

| Demo | Ordner | Live-Vorschau |
|---|---|---|
| Ferienvillen Marmaris (TR/EN, Galerie, WhatsApp) | [`villa-marmaris/`](villa-marmaris/) | https://kale-it.tr/demo/villa/ |

## Lokal ansehen
```
cd villa-marmaris
python -m http.server 8080
```
Danach http://127.0.0.1:8080 öffnen.

## Hinweise
- Statische Seiten (HTML/CSS/JS), keine Build-Schritte nötig.
- Villennamen, Daten und Bewertungen in den Demos sind **Beispiele**.
- Fotos: CC0 / gemeinfrei (rawpixel, StockSnap, Wikimedia Commons).
- Die Live-Vorschau läuft über die Haupt-Website (`website/demo/…` im Repo GOKHAN-WEBSITE) und ist für Suchmaschinen gesperrt (`noindex`).
