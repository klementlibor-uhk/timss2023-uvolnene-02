# Matematický test číslo 2 – verze 2

Elektronický vzdělávací test s 12 uvolněnými úlohami TIMSS 2023 pro žáky 4. ročníku ZŠ. Vzhled a společné ovládání navazují na dokončený test 1 ve verzi 7. Průvodkyní tohoto testu je želvička.

## Spuštění

Otevřete `index.html` v běžném aktuálním prohlížeči. Není nutná instalace ani připojení k další službě. Pro GitHub Pages se nahraje celý obsah této složky do kořene repozitáře `timss2023-uvolnene-02`.

Test obsahuje úvod s nepovinným jménem, interaktivní rady, 12 úloh, automatické vyhodnocení, prohlížení odpovědí, názorná vysvětlení a tisk certifikátu i přehledu žákových odpovědí.

## Bodování

Maximum je **12 bodů**. Každá celá správně vyřešená úloha přináší jeden bod.

| Úloha | Správné řešení |
| --- | --- |
| 1 | A: 597 |
| 2 | 36 |
| 3 | První políčko 8, druhé 3 |
| 4 | D: (40 : 8) + (10 : 2) |
| 5 | C: 180 m |
| 6 | A: 800 cm; B: 24 kroků |
| 7 | D: 6 kg |
| 8 | Jedna souvislá vodorovná cesta přes hvězdičku, alespoň jedno políčko na každou stranu, bez dalších čar |
| 9 | C, B, C |
| 10 | A: Marek; B: Marek a Jirka v libovolném pořadí, bez opakování jména |
| 11 | Označené právě B a C; všechny ostatní kombinace 0 bodů |
| 12 | Modré ryby 10, červené 6, žluté 11 |

U úloh 3, 6, 9, 10 a 12 musí být správné všechny části. Dílčí správnost se po odevzdání zobrazuje i při nulovém bodovém zisku za celou úlohu.

## Ovládání

Žák může postoupit o jednu novou otázku i bez odpovědi. Mezi navštívenými otázkami se může volně vracet. Odpovědi lze měnit do odevzdání.

Číselná pole přijímají pouze číslice 0–9 při psaní i při vložení ze schránky. Číselná klávesnice se otevírá po aktivaci číselného pole. Zachovává zadávání skutečného zlomku, přepnutí na běžné číslo a vymazání celé odpovědi. Trénink procvičuje pouze způsoby potřebné v tomto testu.

Kartičky lze přetáhnout myší nebo dotykem, případně vybrat kliknutím a potom kliknout na cílové políčko. Vybranou kartičku lze vrátit do nabídky. Každá kartička je vždy jen na jednom místě.

Kreslení probíhá po linkách čtvercové sítě. Nástroje jsou Kreslit, Guma a Začít znovu. Guma maže jednotlivé úseky. Klávesnicí lze v síti postupovat šipkami a mezerníkem kreslení zapnout či vypnout.

Po odevzdání jsou odpovědi uzamčené. Želvička nabízí vysvětlení u úloh 2–9, 11 a 12; u úloh 1 a 10 je stručný postup přímo u správné odpovědi.

## Tisk a soukromí

Tlačítko „Vytiskni své odpovědi“ otevře přehled všech 12 úloh se skutečnými žákovými odpověďmi a vyznačenou správností, bez vysvětlení a správných vzorových řešení. Přehled se podle délky rozdělí na více stran. Návrat na úvod z výsledkové stránky vyžaduje potvrzení ztráty odpovědí a výsledku.

Certifikát má tiskový formát A4 na výšku. Pro přehledný tisk doporučujeme vypnout záhlaví a zápatí prohlížeče. Tisk nevyžaduje zapnutí tisku pozadí.

Nepovinné jméno se ukládá pouze do `sessionStorage` této karty pod vlastním klíčem testu 2. Jména ani výsledky se nikam automaticky neodesílají a neshromažďují pro učitele. Odpovědi se neukládají; obnovení stránky testu zahájí nový pokus.

## Zdroje

Podklady: MAT_Test2_MM2.docx a MAT_Test2_MM2.pdf, uvolněné úlohy TIMSS 2023. Původní obrázky úloh jsou převzaté z dodaných podkladů. Ilustrace želvičky byla vytvořena pro elektronický test.

Tento test navazuje na publikaci ČŠI **TIMSS 2023: Inspirace pro rozvoj matematických a přírodovědných dovedností na 1. stupni ZŠ**.

Zdroj: IEA’s Trends in International Mathematics and Science Study – TIMSS 2023.

© 2025 IEA. Vydavatel: TIMSS & PIRLS International Study Center, Lynch School of Education and Human Development, Boston College.


## Změny verze 2

- Trénink přetahování obsahuje čtverečky 1, 2, 3 a tři prázdné rámečky. Pořadí nehraje roli.
- Trénink kreslení používá prázdnou síť bez testového zadání; čáru lze vést libovolně po linkách.
- Trénink nabídky se ptá na počet dní v týdnu a nabízí 3, 7 a 10.
- Číselná pole odmítají písmena, text ze schránky a přetažený text. Opravy a číselná klávesnice zůstávají dostupné.
- Grafy úlohy 11 jsou vektorové SVG se zachovanými původními měřítky a výškami sloupců.
- Návrat z výsledku na úvod vyžaduje potvrzení ztráty odpovědí a výsledku.
- Výsledek ukazuje vlevo body z 12 a vpravo procenta, stejně jako certifikát.
- „Vytiskni své odpovědi“ nabízí vlastní práci s vyznačenou správností, včetně čáry, bez rad od želvičky.
- Název publikace obsahuje matematické a přírodovědné dovednosti.

## Ověření

Prošly kontroly JavaScriptu, 87 kontrol bodování a 35 kontrol číselného vstupu. V prohlížeči byl ověřen průchod se správnými i nesprávnými odpověďmi (9/12, 75 %), změněný trénink, návrat na úvod, oba náhledy pro tisk a zobrazení na úzké obrazovce. Skutečné stránkování při exportu do PDF je potřeba zkontrolovat v běžném prohlížeči; automatické ověření systémového tiskového náhledu zde není dostupné.
