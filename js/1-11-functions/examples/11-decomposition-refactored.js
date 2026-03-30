function validateOrder(order) {
    if (!order.items || order.items.length === 0) {
        throw new Error("Empty order");
    }
}

function calculateSubtotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function applyDiscount(total, isPremium) {
    return isPremium ? total * 0.9 : total;
}

function calculateTax(total) {
    return total * 0.2;
}

function logOrder(userName, total) {
    console.log(`User: ${userName}`);
    console.log(`Total: ${total}`);
}

/* Single Responsibility Principle — кожна функція робить одну річ
Повторне використання - calculateTax, applyDiscount можна використовувати деінде
Тестованість - маленькі функції легко тестувати
Читабельність - processOrder тепер виглядає як сценарій, а не “спагетті код”

 */

function processOrder(order) {
    validateOrder(order);

    let total = calculateSubtotal(order.items);
    total = applyDiscount(total, order.user.isPremium);

    const tax = calculateTax(total);
    total += tax;

    logOrder(order.user.name, total);

    return { total, tax };
}
