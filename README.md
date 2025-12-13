# 🛡️ Proiect Criptografie și Securitate: Demonstrator "Defense in Depth"

## Descriere Proiect

Acest proiect demonstrează necesitatea critică a principiului **"Defense in Depth" (Apărare în Adâncime)**, acoperind ciclul complet al securității: de la exploatarea vulnerabilităților la implementarea soluțiilor definitive pe trei straturi diferite ale unei aplicații web: Baza de Date, Factorul Uman și Infrastructura.

Proiectul a fost dezvoltat ca lucrare de laborator/proiect la materia [Numele Materiei]. 

---

## 🎯 Obiectivele Cheie și Straturile de Apărare

Proiectul abordează și oferă soluții pentru următoarele vulnerabilități, asigurând **Confidențialitatea, Integritatea și Disponibilitatea (Triada C.I.D.)**:

| Stratul Vizat | Atac Demostrat | Clasificare | Soluția Implementată |
| :--- | :--- | :--- | :--- |
| **I. Baza de Date/Server** | SQL Injection | **OWASP A1: Injection** | Interogări Parametrizate (LINQ) și BCrypt |
| **II. Factorul Uman** | Phishing | Inginerie Socială | Autentificare Multi-Factor (MFA) |
| **III. Infrastructură** | Brute Force/DoS | Disponibilitate | Rate Limiting (HTTP 429) |

---

## 💻 Tehnologii Utilizate

* **Backend:** C# (.NET Core / .NET 7/8)
* **Bază de Date:** SQL Server (prin Entity Framework Core)
* **Hashing:** BCrypt
* **Frontend:** **React, TypeScript, Tailwind CSS, VITE**

## 🚀 Instalare și Rulare

### 1. Backend (C#/.NET)

1.  **Clonează Repository-ul:**
    ```bash
    git clone [https://github.com/NeRrO106/Proiect-Cripto](https://github.com/NeRrO106/Proiect-Cripto)
    cd Proiect-Cripto/Cripto-backend
    ```
2.  **Configurare Bază de Date:**
    * Asigură-te că ai instalat SQL Server LocalDB sau o instanță SQL Server accesibilă.
    * Rulează migrațiile pentru a crea schema DB-ului.
3.  **Rulare:**
    ```bash
    dotnet run
    ```
    *Aplicația API va porni pe portul specificat (ex: `https://localhost:7001`).*

### 2. Frontend (React / TypeScript)

1.  Navighează la folderul Frontend:
    ```bash
    cd ../Cripto-frontend
    ```
2.  **Instalează Dependențele:**
    ```bash
    npm install
    # sau
    yarn install
    ```
3.  **Rulare (Folosind Vite):**
    ```bash
    npm run dev
    # sau
    yarn dev
    ```
    *Aplicația React va porni pe `http://localhost:5173`

---

## ⚙️ Ghid de Demonstrație a Vulnerabilităților

### 1. SQL Injection (OWASP A1)

* **Atacul:** Accesează formularul de login **vulnerabil** `http://localhost:5173/loginvulnerable`. 
* **Payload:** Folosește `admin' OR '1'='1 --` în câmpul de `Username` pentru a ocoli autentificarea.
* **Soluția:** Analizează codul securizat care folosește **Interogări Parametrizate (LINQ)** și **BCrypt** pentru a preveni atacul.

### 2. Rate Limiting (Protecția Brute Force)

* **Acțiune:** Încearcă să te loghezi de **mai mult de 5 ori** (sau regula ta) în decurs de 60 de secunde, folosind credențiale invalide.
* **Rezultat:** Backend-ul va bloca cererile și va răspunde cu eroarea **`HTTP 429 Too Many Requests`**. 

### 3. Simulare Phishing (Inginerie Socială)

* **Vector:** Navighează la pagina de *spoofing*(`http://localhost:5173/sendemail` - pentru a trimite un mail cu un link "infectat").
* **Analiză:** Verifică log-ul generat de Backend pentru a vedea **datele furate și adresa IP de origine**.
* **Apărare:** Subliniază importanța **Autentificării Multi-Factor (MFA)** în cod, ca singura metodă de a neutraliza furtul de parolă. 

---

## ⚠️ Avertisment de Securitate

Acest proiect este conceput exclusiv pentru **scopuri educaționale și demonstrative**. Codul vulnerabil nu trebuie folosit niciodată în producție. Orice tentativă de a utiliza tehnicile de atac pe sisteme care nu îți aparțin este strict interzisă și ilegală.
