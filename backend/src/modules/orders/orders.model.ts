export interface OrderItem {
    userId: string;
    items: {
        productId: string;
        title: string;
        price: number;
        quantity: number;
    }[];
    total: number;
    paymentStatus: "pending" | "paid" | "failed";
    stripePaymentIntentId?: string;
    createdAt?: Date;
}