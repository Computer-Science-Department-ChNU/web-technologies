/* type OrderItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

type User = {
    id: string;
    name: string;
    isPremium: boolean;
};

type Order = {
    id: string;
    user: User;
    items: OrderItem[];
    createdAt: Date;
};
 */

function processOrder(order) {
    // validation
    if (!order.items || order.items.length === 0) {
        throw new Error("Empty order");
    }

    // total count
    let total = 0;
    for (const item of order.items) {
        total += item.price * item.quantity;
    }

    // set discount
    if (order.user.isPremium) {
        total *= 0.9;
    }

    const tax = total * 0.2;
    total += tax;

    // logging
    console.log(`User: ${order.user.name}`);
    console.log(`Total: ${total}`);

    return {
        total,
        tax,
    };
}

/* Зазвичай називають таке “spaghetti code” (спагеті-код).
   Spaghetti code - коли:
   - логіка перемішана в одному місці
   - функція робить занадто багато
   - важко зрозуміти, що відбувається
 */
