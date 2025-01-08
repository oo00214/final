// รายการเมนูอาหาร
const menuItems = [
    { name: 'น้ำซุป', price: 50 },
    { name: 'เนื้อ', price: 120 },
    { name: 'ผัก', price: 30 },
    { name: 'เครื่องดื่ม', price: 40 },
    { name: 'ขนมหวาน', price: 60 },
];

// ฟังก์ชันแสดงเมนูใน index.html
function renderMenu() {
    const menuTable = document.getElementById('menu-table');
    menuItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price} บาท</td>
            <td><input type="number" class="form-control quantity" id="qty-${index}" min="0" value="0"></td>
        `;
        menuTable.appendChild(row);
    });

    // ปุ่ม "ไปหน้าสรุปบิล"
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', () => {
        const selectedItems = [];
        menuItems.forEach((item, index) => {
            const qtyInput = document.getElementById(`qty-${index}`);
            const quantity = parseInt(qtyInput.value, 10);
            if (quantity > 0) {
                selectedItems.push({ ...item, quantity });
            }
        });
        // เก็บรายการที่เลือกใน LocalStorage
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        // ไปหน้าสรุปบิล
        window.location.href = 'bill.html';
    });
}

// ฟังก์ชันคำนวณบิลใน bill.html
function calculateBill() {
    const billTable = document.getElementById('bill-table');
    const discountInfo = document.getElementById('discount-info');
    const totalPriceDisplay = document.getElementById('total-price');
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    let total = 0;
    let totalItems = 0;

    selectedItems.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        totalItems += item.quantity;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${itemTotal} บาท</td>
        `;
        billTable.appendChild(row);
    });

    // ตรวจสอบส่วนลด
    if (totalItems >= 5) {
        discountInfo.style.display = 'block';
        total *= 0.9; // ลด 10%
    } else {
        discountInfo.style.display = 'none';
    }

    // แสดงผลรวม
    totalPriceDisplay.textContent = total.toFixed(2);
}
