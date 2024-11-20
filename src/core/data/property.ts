
interface IProperty {
  id: number;
  category: string;
  address: string;
  price: string;
  state: string;
  date: string;
}

const property: Array<IProperty> = [
  {
    id: Math.floor(Math.random() * 99999) + 1,
    category: "Appartamento",
    address: "Via della selce",
    price: "€ 250.000,00",
    state: "in vendita",
    date: "14 Dec 2020, 8:43 pm",
  },
  {
    id: Math.floor(Math.random() * 99999) + 1,
    category: "Magazzino",
    address: "Via della selce",
    price: "€ 200.000,00",
    state: "in vendita",
    date: "14 Dec 2020, 8:43 pm",
  }, {
    id: Math.floor(Math.random() * 99999) + 1,
    category: "Appartamento",
    address: "Via della croce",
    price: "€ 250.000,00",
    state: "in vendita",
    date: "14 Dec 2020, 8:43 pm",
  }, {
    id: Math.floor(Math.random() * 99999) + 1,
    category: "Appartamento",
    address: "Via della selce",
    price: "€ 50.000,00",
    state: "Affitto",
    date: "14 Dec 2020, 8:43 pm",
  }, {
    id: Math.floor(Math.random() * 99999) + 1,
    category: "Ufficio",
    address: "Via della selce",
    price: "€ 200.000,00",
    state: "in vendita",
    date: "14 Dec 2020, 8:43 pm",
  }, {
    id: Math.floor(Math.random() * 99999) + 1,
    category: "Terreno",
    address: "Via della selce",
    price: "€ 250.000,00",
    state: "in vendita",
    date: "14 Dec 2020, 8:43 pm",
  },
];

export type { IProperty };

export default property;
