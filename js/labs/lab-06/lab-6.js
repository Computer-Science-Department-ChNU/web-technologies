'use strict';

/*
1. create static markup (layout + product list), css
2. create static modal
3. create static snack bar
2. create mock data
3. js-logic
3.1 init app function - call all functions to initialize app
3.2 collect your DOM Elements (js-prefix-name selector)
3.3 create utils functions (generateId, getCurrentDate)
3.3 calculateTotalPrice, formatPrice, updateTotalPrice
3.4 getCategories from products
3.5 updateFilterButtons - depends on categories, toggle buttons active style
3.6 filterProducts(category) - depends on categories
3.7 resetFilter
3.8 sortProducts(sortBy) + resetSort
3.9 updateSortButtons (toggle buttons active style)
3.10 func for ui showSnackbar + setTimeout, toggleModal(show = true, editMode = false)

 // Core Functions
 const products = [];

 const addProduct = (productData) => {

    const newProduct = {
        id: generateId(),
        name: productData.productName,
        price: productData.productPrice,
        category: productData.productCategory,
        image: productData.productImage,
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate()
    };

   products = products.push(newProduct);
    // оновити список на ui
    // оновити фільтри
    // оновити ціну

    return newProduct;
};

const updateProduct = (productId, productData) => {
    const updatedProducts = products.map(product => {
        if (product.id === productId) {
            return {
                ...product,
                name: productData.productName,
                price: productData.productPrice,
                category: productData.productCategory,
                image: productData.productImage,
                updatedAt: getCurrentDate()
            };
        }
        return product;
    });

    products = updatedProducts;
   // оновити список на ui
    // оновити фільтри
    // оновити ціну

    return products.find(product => product.id === productId);
};

 const deleteProduct = (productId) => {
    const productToDelete = products.find(product => product.id === productId);

    if (!productToDelete) return null;

    products = products.filter(product => product.id !== productId);
    // оновити список на ui
    // оновити фільтри
    // оновити ціну

    return productToDelete;
};

const createProductCard = (product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-id">ID: ${product.id}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">${formatPrice(product.price)}</div>
            <div class="product-category">${product.category}</div>
            <div class="product-actions">
                <button class="edit-btn">Редагувати</button>
                <button class="delete-btn">Видалити</button>
            </div>
        </div>
    `;

    const editBtn = card.querySelector('.edit-btn');
    const deleteBtn = card.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
        openEditModal(product.id);
    });

    deleteBtn.addEventListener('click', () => {
        deleteProductWithAnimation(product.id);
    });

    return card;
};

getFilteredAndSortedProducts
refreshProductList
openEditModal - call toggleModal(true, true);
 */
