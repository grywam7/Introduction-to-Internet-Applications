# Wprowadzenie-do-aplikacji-Internetowych

Dokumentacja do projektu 2, znajdującego się w folderze unsuspicious-shop

Ten projekt to prosty sklep internetowy stworzony jako projekt na studia. Aplikacja pozwala na przeglądanie produktów, zarządzanie koszykiem, dodawanie opinii oraz logowanie użytkowników.

---

## 📋 Setup projektu

Aby uruchomić projekt lokalnie, wykonaj poniższe kroki:

0. **Posiadaj pobrany Node.js w wersji 16.x lub wyższej**

1. **Sklonuj repozytorium i uruchom aplikacje lokalnie:** (bash) 
   ```bash
   git clone https://github.com/grywam7/Wprowadzenie-do-aplikacji-Internetowych.git
   cd unsuspicious-shop
   npm run dev
   ```
2. **Otwórz aplikację w przeglądarce:**
   http://localhost:5173

---

## 🛠️ Użyte technologie i biblioteki

### **Frontend:**
- **React** – Biblioteka do budowania interfejsów użytkownika.
- **TypeScript** – Superset JavaScriptu, dodający typowanie.
- **Vite** – Narzędzie do budowania i uruchamiania aplikacji React.

### **Zarządzanie stanem:**
- **Context API** – Używane do zarządzania stanem aplikacji w następujących miejscach:
  - **Koszyk:** Przechowywanie informacji o produktach dodanych do koszyka oraz ich ilości. 
    - Plik: `src/context/CartContext.tsx`.
    - Funkcjonalność: Dodawanie/usuwanie produktów, podsumowanie koszyka.
  - **Opinie:** Przechowywanie opinii użytkowników o produktach.
    - Plik: `src/context/ReviewContext.tsx`.
    - Funkcjonalność: Dodawanie opinii i ich filtrowanie według produktu.
  - **Uwierzytelnienie:** Przechowywanie informacji o zalogowanym użytkowniku.
    - Plik: `src/context/AuthContext.tsx`.
    - Funkcjonalność: Logowanie, rejestracja, wylogowanie.

### **Mockowanie backendu:**
- **LocalStorage** – Używane jako symulowana baza danych w przeglądarce. Wszystkie operacje (np. dodawanie użytkowników, zarządzanie koszykiem) są zapisywane w `LocalStorage`.
  - **Gdzie jest używane?**
    - Przechowywanie zarejestrowanych użytkowników (`AuthContext`).
    - Przechowywanie danych koszyka (`CartContext`).
    - Przy starcie aplikacji dane są ładowane z `LocalStorage`, aby umożliwić kontynuację sesji.

### **Styling:**
- **CSS (Custom styles)** – Prosty CSS używany w komponentach aplikacji.

---

## 📂 Struktura projektu

```plaintext
src/
├── components/       # Komponenty wielokrotnego użytku (np. ProductCard, Navbar)
├── context/          # Zarządzanie stanem aplikacji (koszyk, uwierzytelnienie, opinie)
├── data/             # Mockowane dane produktów i użytkowników
├── pages/            # Strony aplikacji (Home, Login, ProductDetails, Cart, Orders)
├── App.tsx           # Główna konfiguracja aplikacji
├── main.tsx          # Punkt wejścia aplikacji
└── styles/           # Pliki CSS
```

---

## 📚 Funkcjonalności

- **Przeglądanie produktów** – Lista produktów z możliwością filtrowania po nazwie.
- **Koszyk** – Dodawanie produktów do koszyka z opcją ustawienia ilości.
- **Opinie** – Możliwość dodawania opinii z oceną w gwiazdkach (jedna opinia na użytkownika).
- **Logowanie i rejestracja** – Obsługa użytkowników z mockowanych danych.
- **Historia zamówień** – Przeglądanie zamówień i pobieranie ich w formacie JSON.

---

## 📜 Licencja

Ten projekt został stworzony w celach edukacyjnych i nie jest przeznaczony do użytku komercyjnego. Możesz go używać i modyfikować zgodnie z potrzebami.

