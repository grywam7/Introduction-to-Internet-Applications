// src/data/products.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  cost: number;
  description: string;
  details: string;
  examples: string[];
  interception: number;
  death: number;
  kills: number;
  icon?: string;
  image?: string;
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: "Atak z bronią palną na budynki publiczne",
    price: 5000,
    cost: 3000,
    description: "Zamachowcy otwierają ogień w miejscach publicznych, np. szkołach, lotniskach, lub innych obiektach publicznych.",
    details: "Najczęściej stosowany w budynkach o dużym natężeniu ruchu. Atak często kończy się konfrontacją z policją.",
    examples: ["Atak na Columbine High School (1999)", "Atak w Bataclan, Paryż (2015)"],      
    interception: 7,
    death: 3,
    kills: 40,
    icon: "/icon_1.jpg",
  },
  {
    id: 2,
    name: "Zamach bombowy na sieć pociągów",
    price: 15000,
    cost: 10000,
    description: "Podłożenie bomb w zatłoczonych pociągach lub na dworcach w celu maksymalizacji liczby ofiar.",
    details: "Planowany w godzinach szczytu, aby zmaksymalizować straty. Ataki tego typu są trudne do wykrycia z powodu dużej liczby potencjalnych celów.",
    examples: ["Zamachy w Madrycie (2004)", "Atak na metro w Londynie (2005)"],  
    interception: 5,
    death: 2,
    kills: 300,
    icon: "/icon_2.png",
  },
  {
    id: 3,
    name: "Zamach bombowy na infrastrukturę",
    price: 20000,
    cost: 15000,
    description: "Podłożenie materiałów wybuchowych w kluczowych budynkach, np. hotelach, parlamentach lub kasynach.",
    details: "Celem jest zniszczenie infrastruktury, a także zastraszenie populacji.",
    examples: ["Zamach na Oklahoma City (1995)", "Atak na hotel Marriott w Islamabadzie (2008)"],
    interception: 6,
    death: 2,
    kills: 250,
    icon: "/icon_3.jpg",
  },
  {
    id: 4, 
    name: "Kamikhadze z bombą",
    price: 10000,
    cost: 5000,
    description: "Jedna osoba z ładunkiem wybuchowym detonuje się w zatłoczonym miejscu.",
    details: "Atak przeprowadzany przez osobę gotową oddać życie dla sprawy, co czyni go bardzo trudnym do powstrzymania.",
    examples: ["Ataki w Londynie (2005)", "Atak na teatr Dubrowka w Moskwie (2002)"],  
    interception: 4,
    death: 10,
    kills: 30,
    icon: "/icon_4.png",
  },
  {
    id: 5,
    name: "Auto pułapka",
    price: 15000,
    cost: 10000,
    description: "Samochód wypełniony materiałami wybuchowymi jest zdetonowany w pobliżu celu.",
    details: "Zwykle wykorzystywany do zaatakowania ambasad, placówek rządowych lub publicznych.",
    examples: ["Atak na ambasadę USA w Nairobi (1998)", "Zamach w Bejrucie (1983)"],  
    interception: 6,
    death: 3,
    kills: 40,
    icon: "/icon_5.jpg",
  },
  {
    id: 6,
    name: "Tir BOMBA",
    price: 30000,
    cost: 20000,
    description: "Ciężarówka wypełniona materiałami wybuchowymi detonowana w celu zniszczenia budynku lub uszkodzenia infrastruktury.",
    details: "Wyjątkowo niszczycielski, stosowany w miejscach o wysokiej wartości symbolicznej lub strategicznej.",
    examples: ["Atak w Oklahoma City (1995)", "Zamach na żołnierzy USA w Bejrucie (1983)"],
    interception: 5,
    death: 5,
    kills: 80,
    icon: "/icon_6.jpg",
  },
  {
    id: 7,
    name: "Atak gazem bojowym sarin",
    price: 50000,
    cost: 30000,
    description: "Uwolnienie gazu bojowego sarin w zamkniętych przestrzeniach, np. w metrze.",
    details: "Ataki chemiczne są rzadkie, ale bardzo trudne do opanowania i wywołują masową panikę.",
    examples: ["Atak w tokijskim metrze (1995)", "Atak na Ghouta w Syrii (2013)"],
    interception: 3,
    death: 2,
    kills: 400,
    icon: "/icon_7.jpg",
  },
  {
    id: 8,
    name: "Przechwycenie samolotu",
    price: 20000,
    cost: 5000,
    description: "Porwanie samolotu w celu uzyskania okupu lub nagłośnienia politycznego.",
    details: "Zamachowcy zazwyczaj zmuszają pilotów do zmiany kursu pod groźbą śmierci pasażerów.",
    examples: ["Porwanie samolotu Lufthansa (1977)", "Porwanie lotu TWA 847 (1985)"],
    interception: 7,
    death: 2,
    kills: 10,
    icon: "/icon_8.jpg",
  },
  {
    id: 9,
    name: "Kamikhadze porwanym samolotem",
    price: 50000,
    cost: 10000,
    description: "Porwanie samolotu w celu jego wykorzystania jako broni do zniszczenia budynków.",
    details: "Spektakularne i niszczycielskie, planowane z dużym wyprzedzeniem i wsparciem logistycznym.",
    examples: ["Ataki z 11 września 2001 r."],
    interception: 4,
    death: 10,
    kills: 3000,
    icon: "/icon_9.jpg",
  }
];
