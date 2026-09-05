# KITE-MALLORCA: Google Calendar Kürzel- & Titelsyntax

Diese Dokumentation definiert die **verbindliche Titelsyntax und das einheitliche Kürzelsystem** für alle Buchungen im Google Kalender von Kite-Mallorca.

Ziel ist eine **kompakte, auf einen Blick erfassbare Nomenklatur**, die auf Smartphones (Google Kalender App / Apple Kalender) ohne horizontales Scrollen alle essenziellen Informationen darstellt:
1. **Ressourcenbelastung** (Pax, Trainer exklusiv vs. Gruppe vs. Materialmiete)
2. **Kundenidentifikation** (Vorname)
3. **Direktkontakt per Klick** (WhatsApp Link oder RCS Nummer)
4. **Sprachen** für Trainer-Matching
5. **Sonderwünsche & Materialdisposition**

---

## 1. Titelsyntax

Termintitel im Google Kalender werden nach folgendem Format strukturiert:

```text
{Pax}{Kurskuerzel}, {Vorname}, {KontaktLink} ({Sprachen}) {Sonderwuensche}
```

### Bestandteile:

| Segment | Bedeutung | Format / Regeln | Beispiel |
| :--- | :--- | :--- | :--- |
| `{Pax}` | Teilnehmeranzahl | Ganze Zahl (`1`, `2`, `3`, `4`) direkt vor dem Kurskuerzel | `2` |
| `{Kurskuerzel}` | Art des Kurses / Buchung | Verbindliches Kürzelsystem (Groß-/Kleinschreibung beachten) | `Cc` |
| `, {Vorname}` | Name des Kunden | Vorname des Hauptbuchers (bei Paaren z.B. `Max & Eva`) | `, Max` |
| `, {KontaktLink}` | Direkter Kommunikationslink | Klickbarer WhatsApp-Link oder RCS-Nummer ohne Leerzeichen | `, wa.me/34696264729` |
| `({Sprachen})` | Unterrichtssprachen | ISO-Codes in Klammern | `(de)`, `(en)`, `(de/en)` |
| `{Sonderwuensche}` | Material / Besonderheiten | Freitext-Kürzel am Ende | `Eig.Neo`, `Boot` |

---

## 2. Verbindliche Kurskuerzel

| Kürzel | Kursbezeichnung | Dauer / Einheiten | Max. Pax | Trainerauslastung | FastHooked Service ID |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`Cc`** | 10h Kitesurf Grundkurs (Complete Course) | 10h (3–5 Tage) | 4 | Gruppe (max. 4 Pax / Trainer) | `22222222-1111-4111-8111-000000000001` |
| **`Tr`** | 3h Kitesurf Schnupperkurs (Tryout) | 3h (1 Tag) | 4 | Gruppe (max. 4 Pax / Trainer) | `22222222-1111-4111-8111-000000000002` |
| **`TrCc`** | Schnupperkurs mit Upgrade-Option auf 10h | 3h (+7h Option) | 4 | Gruppe (Option auf Folgeeinheiten) | – |
| **`Rf`** | 4h Kitesurf Refresher / Aufsteiger | 4h (1–2 Tage) | 4 | Gruppe (max. 4 Pax / Trainer) | `22222222-1111-4111-8111-000000000003` |
| **`Pr`** | 1h Kitesurf / Foil Privatkurs | Stundengenau (1h+) | 1 | **1:1 Exklusiv** (Trainer voll belegt) | `22222222-1111-4111-8111-000000000005` |
| **`Semi`** | Semiprivat | Stundengenau (1h+) | 2 | **2:1 Exklusiv** (Trainer voll belegt) | – |
| **`Wfc`** | Wingfoil Kurs | 10h (3–5 Tage) | 3 | Gruppe (max. 3 Pax / Trainer) | `22222222-1111-4111-8111-000000000004` |
| **`WfcPr`** | Wingfoil Privatunterricht | Stundengenau (1h+) | 1 | **1:1 Exklusiv** (Trainer voll belegt) | – |
| **`Ds`** | Dockstart Session (1h Coaching) | 1h | 3 | Gruppe (max. 3 Pax / Trainer mit mobiler Plattform) | – |
| **`DsPr`** | Dockstart Privatunterricht | 1h | 1 | **1:1 Exklusiv** (Trainer voll belegt) | – |
| **`R`** | Kitesurf Rental (Materialmiete) | Zeit/Tag flexibel | n/a | **Kein Trainer** belegt (Materialpool) | – |
| **`WR`** | Wingfoil Rental (Materialmiete) | Zeit/Tag flexibel | n/a | **Kein Trainer** belegt (Materialpool) | – |
| **`Block`** | Trainer abwesend / Pause / frei | Beliebig | – | **Trainer blockiert** (Urlaub, Krank, Pause) | – |

---

## 3. Kontaktformate & Links

Um den Kunden direkt aus der mobilen Kalenderansicht mit einem Fingertipp zu kontaktieren:

- **WhatsApp Link (bevorzugt):**  
  `wa.me/<LandesvorwahlOhnePlus><Nummer>`  
  *Beispiel:* `wa.me/34696264729` oder `wa.me/491701234567`  
  *Vorteil:* Öffnet direkt den WhatsApp-Chat ohne die Nummer im Adressbuch speichern zu müssen.
- **RCS / Mobilnummer:**  
  `RCS +<Landesvorwahl><Nummer>`  
  *Beispiel:* `RCS +34696264729`

---

## 4. Sprachangaben & Sonderwünsche

### Sprachen:
In runden Klammern hinter dem Kontaktlink:
- `(de)` = Deutsch
- `(en)` = Englisch
- `(es)` = Spanisch
- `(fr)` = Französisch
- `(it)` = Italienisch
- `(de/en)` = Deutsch oder Englisch
- `(es/en)` = Spanisch oder Englisch

### Gängige Sonderwünsche & Dispositionshinweise:
- `Eig.Neo` – Schüler bringt eigenen Neoprenanzug mit
- `Boot` – Bootsschulung erwünscht / vereinbart
- `Gross (2m/105kg)` – Physische Besonderheiten für Board-/Kite-/Trapez-Vorbereitung (Trapez XXL, Board 145+)
- `VDWS` – VDWS Lizenzprüfung / Upgrade gebucht
- `Eig.Foil` – Eigene Foil-Hardware vorhanden

---

## 5. Beispiele aus der Praxis

| Kalendertitel | Interpretation |
| :--- | :--- |
| `2Cc, Max, wa.me/34696264729 (de/en) Eig.Neo` | 2 Schüler für 10h Kitesurf Grundkurs, Ansprechpartner Max, WhatsApp erreichbar, deutsch-/englischsprachig, eigener Neo |
| `1Pr, Sarah, wa.me/491701234567 (en) Boot` | 1:1 Privatstunde exklusiv, Sarah, englischsprachig, Bootsschulung |
| `1TrCc, Lukas, RCS +34696264729 (de) Gross (2m/105kg)` | 1 Schnupperkurs mit Upgrade-Option auf Grundkurs, Lukas, RCS, XXL-Material einplanen |
| `2Semi, Felix, wa.me/491512345678 (de) Trapez Gr. L` | 2 Schüler Semiprivat 2:1 exklusiv bei einem Trainer |
| `3Wfc, Elena, wa.me/34611223344 (es/en)` | 3 Schüler Wingfoil Gruppe (Gruppe voll ausgelastet) |
| `1WfcPr, Marc, wa.me/33612345678 (fr/en) Eig.Foil` | 1:1 Wingfoil Privatunterricht mit eigenem Foil |
| `2Ds, Jan, wa.me/491712345678 (de) 2027` | 2 Schüler Dockstart Session mit mobiler Plattform (1h Coaching), Jan, WhatsApp |
| `1DsPr, Tim, wa.me/49160991122 (de) Eig.Foil` | 1:1 Dockstart Privatunterricht mit mobiler Plattform, Tim, eigenes Foil |
| `1R, Jens, wa.me/49160998877 (de) Kite 12m + Board` | Kitesurf Rental – reines Material, Trainer frei für Kurse |
| `Block, Daniel, Pause` | Daniel hat Mittagspause / Frei |

---

## 6. Verknüpfung im Webprojekt & Buchungs-Pipeline

- **Webprojekt Config:** Abgelegt in `_data/calendar_codes.yml` für programmatische Verfügbarkeit in Liquid-Snippets.
- **FastHooked Integration:** Bei Buchungsbestätigung im FastHooked Storefront (`https://storefront.fasthooked.com`) erzeugen Webhooks den Google Calendar Eintrag automatisch nach genau dieser Syntax.
- **Widgets:** Die Buchungs-Widgets (`booking-buy-button-top.html`, `booking-card.html`, `booking-catalog.html`) übermitteln den jeweiligen Kurstyp und die `serviceId` konsistent an das Buchungssystem.
