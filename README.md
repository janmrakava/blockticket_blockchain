# Diploma Thesis

## Table of content

1. [Introduction](#description)
2. [Technologies](#technologies-used)
3. [Installation and usage](#how-to-use-app)

## Description

The application will serve as a demonstrative example of the use of blockchain in buying and selling tickets. The aforementioned blockchain will be used as a repository and carrier for individual tickets.

## Figma design

https://www.figma.com/file/jPaSE5MjF234pIPWLiwvDZ/TicketBlock?type=design&node-id=263%3A7335&mode=design&t=LZDrUcaYkDEhq902-1

## Technologies used

This project is a web application developed using Node.js, Express, TypeScript, React, Sass, and MongoDB.

- [**Node.js**](https://nodejs.org/en)
- [**Express.js**](https://expressjs.com/)
- [**Typescript**](https://www.typescriptlang.org/)
- [**ReactJS**](https://react.dev/)
- [**Sass**](https://sass-lang.com/)
- [**MongoDB**](https://www.mongodb.com/)
- [**Truffle**](https://archive.trufflesuite.com)
- [**Ganache**](https://archive.trufflesuite.com/ganache/)
- [**Solidity**](https://soliditylang.org)

## Jak spustit aplikaci

Pro úspěšné spuštění aplikace je nutné mít nainstalované [**Node.js**](https://nodejs.org/en) a npm

1. Naklonovat nebo stáhnout repozitář z adresy - https://github.com/janmrakava/blockticket_blockchain
2. Po té se přesunout do složky /blockticket_blockchain a zadat příkaz npm run install-all. Tím se nainstalují
    všechny potřebné knihovny. 
3. Dále je nutné vytvořit soubor .env ve složce /server. To je možné pomocí příkazu - npm run create-env
4. Předešlý krok vytvoří soubor .env, ale teď je potřebné do tohoto souboru vložit následující text.
    ATLAS_URI="mongodb+srv://janmrakava:mrakava@ticketblock.2qygwkf.mongodb.net/ticketblock?retryWrites=true&w=majority"
    JWTTOKEN="Diplomka"
5. Pokud se teď zadá příkaz npm run dev, tak by se měla aplikace spustit na adrese http://localhost:5173/. Zatím je možné jen aplikaci prohlížet, ale blockchain část ještě nefunguje.
6. Je nutné mít v prohlížeči nainstalované rozšíření Metamask a mít tam účet. Doporučuji prohlížeč Firefox/Chrome.
7. Pro úspěšné fungování je nutné mít nainstalovaný program Ganache - https://archive.trufflesuite.com/ganache/
8. Pokud je Ganache úspěšně nainstalované, tak je možné jej spustit. 
9. Objeví se úvodní obrazovka, kde je možné vidět nabídku WorkSpaces. Zvolit nabídku New Workspace (Ethereum). 
10. Objeví se obrazovka, kde je nastavení nové sítě. Je nutné kliknout na tlačítko Add project a importovat soubor  truffle-config.js ze složky /client. A potvrdit tlačítkem Start
11. Měla by se objevit obrazovka, kde je možné vidět rozhraní Ganache a na záložce accounts je možné vidět různé účty. 
12. Dále je nutné importovat vytvořenou síť do Metamasku. Kliknout na metamask v prohlížeči -> tři tečky v pravém horním rohu ->
    Settings -> Networks -> Add network -> Otevře se nová záložka -> Znova kliknout na networks a vložit tam informace, jak lze vidět na obrázku. 
    --- VLOŽIT IMAGE Z METAMASK---
13. Pokud bude nastavení sítě úspěšné, tak je možné importovat účty v rámci lokální blockchainové sítě. 
14. Každý účet má po kliknutí privátní klíč, který je nutné vložit do Metamasku.
15. Vložení účtu se provádí následujícím způsobem. Je nutné zvolit naši lokální síť. A nahoře jsou
    záložka Account ---Přidat iamge---- Ta se rozklikne a zvolí se Add account or hardware wallet -> Import Account -> Vloží se privátní klíč a Import tlačítko. Tím je účet importován a lze používat v rámci aplikace. Pro kompletní fungování aplikace vložit alespoň dva účty. 
16. Po té je možné začít testovat aplikaci. Pokud vše funguje správně, tak jsou v aplikaci dva vytvořené účty. Ale je 
    možné vytvořit další. 
        první učet: email: karelnovak@seznam.cz, heslo: Karel123-+
        druhý účet: email: tomas@seznam.cz, heslo: Tomas123-+ (Admin)

Vytvoření nové události: 
1. Administrátorský účet může zakládat nové události - Přes ikonu profilu v pravém rohu a možnost Vytvořit novou událost.
2. Zobrazí se rozhraní, kde je možné zadávat různé informace o akci. Po jejich vyplnění je možné pomocí tlačítka akci vytvořit.
3. Vlastníkem a pořadatelem akce je aktuálně zvolený účet v Metamasku. Toto  vlastnictví nejde měnit. 

Správa události: 
1. Pokud si chce pořadatel akcí zobrazit své události, tak je tak možné přes ikonu profilu v pravém rohu a Moje události.
2. Pokud má správce nějaké akce, tak se tu zobrazí. Kliknutím na nějakou akci se zobrazí více informací. 
3. Na stránce o jedné akci je možné vidět všechny informace o ní, měnit  cenu vstupenek a celou akci zrušit. Také je možné
    vidět všechny vytvořené vstupenky na událost a informace o nich. 
4. Akce se zobrazují dle aktuálního účtu na Metamasku, přihlášený uživatel v aplikaci na to nemá vliv. 

Proces koupení vstupenky: 
1. Na hlavní stránce aplikace, nebo na jednotlivých odkazech v navigaci je možné prohlížet akce dle kategorií. Pokud tedy 
    nějaké akce existují. 
2. Kliknutím na akci se dostane na stránku o události, kde se nachází tlačítko Získat vstupenky. Toto tlačítko vede
    na stránku, kde je seznam vstupenek a i tlačítko na koupení.
3. Pokud jsou dostupné nějaké vstupenky ke koupi, tak je možné tlačítkem vstupenku koupit. Pokud má uživatel dost prostředků
    na svém účtu Metamask. Transakce se tu nijak nepotvrzuje, protože se jedná o lokální blockchainovou síť, a tak Metamask
    nedokáže vyvolat nějaké potvrzovací okno. 
4. Pokud byl nákup úspěšný, tak uživatel je za pár vteřin přesměrován na stránku ve svém profilu - Moje vstupenky. Zde může
    vidět všechny své vstupenky, i tu nově koupenou. 
5. Vstupenky se opět vykreslují dle aktuálně zvolené adresy na Metamasku. 

Proces ověření vstupenky: 
1. Uživatel může ověřit vstupenku přes odkaz v zápatí stránky - Ověření vstupenky. 
2. Tato stránka slouží k zadání ID vstupenky a zobrazení informací a historii úprav dané vstupenky. 
3. Informace a historie se zobrazí, když se zadá platné ID. Pokud není platné, tak se nic nezobrazí. 

