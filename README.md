# course-api-exercise

Ovo je vežbovni Node.js / Express / MongoDB API projekat sa fokusom na CRUD operacije i specijalne endpointe.

## Opis

Projekat implementira sledeće modele i njihove veze:

- **Product**: name, description, price, category, manufacturer, inStock, ratings
- **Category**: name, description, parentCategory, products
- **Manufacturer**: name, country, yearEstablished, products
- **Rating**: score, comment, user, product, dateCreated

## Funkcionalnosti

Za svaki model su implementirane standardne CRUD operacije:  
- CREATE – dodavanje novog dokumenta  
- READ – čitanje jednog i svih dokumenata  
- UPDATE – ažuriranje postojećeg dokumenta (PUT)  
- DELETE – brisanje dokumenta  

### Specijalni Endpoints

**Products**  
- Pretraga po opsegu cena  
- Filtriranje po kategoriji i proizvođaču  
- Sortiranje po ceni (rast/opađanje)  
- Prosečna ocena  

**Categories**  
- Prikaz svih podkategorija  
- Top 3 kategorije po broju proizvoda  
- Hijerarhijski parent-child prikaz  

**Manufacturers**  
- Proizvođač sa najviše proizvoda  
- Filtriranje po državi  
- Prosečna cena proizvoda  

**Ratings**  
- Prosečna ocena po proizvodu  
- Filtriranje komentara po oceni  
- Najnoviji komentari za proizvod  

## Tehnologije

- Node.js  
- Express.js  
- MongoDB / Mongoose  