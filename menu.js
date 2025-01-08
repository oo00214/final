// ตะกร้าสินค้าที่เลือก
const cart = [];

// ฟังก์ชันเพิ่ม/ลดจำนวนสินค้า
function updateQuantity(button, action) {
    const itemName = button.dataset.name;
    const itemPrice = parseInt(button.dataset.price);
    const quantityElement = document.getElementById(itemName);
    let quantity = parseInt(quantityElement.textContent);

    if (action === 'increase') {
        quantity++;
        addToCart(itemName, itemPrice);
    } else if (action === 'decrease' && quantity > 0) {
        quantity--;
        removeFromCart(itemName);
    }
    quantityElement.textContent = quantity;
}

// เพิ่มสินค้าในตะกร้า
function addToCart(name, price) {
    const item = cart.find((item) => item.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
}

// ลบสินค้าออกจากตะกร้า
function removeFromCart(name) {
    const itemIndex = cart.findIndex((item) => item.name === name);
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
}

// ส่งค่าไปยังหน้าบิล
function goToBill() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'bill.html';
}
