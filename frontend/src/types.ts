export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    brand: string;
    category: string;
    clickedToday: number;
    clickedWeek: number;
}
