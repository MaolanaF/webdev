// Variabel untuk menyimpan jumlah barang yang ditambahkan ke keranjang
const cart = {};
const taxRate = 0.1;

// Objek yang berisi informasi nama dan harga barang
const products = {
    1: { name: "Bakwan", price: 12000 },
    2: { name: "Tahu Pedas", price: 10000 },
    3: { name: "Mendoan", price: 9000 },
    4: { name: "Cireng", price: 15000 },
    5: { name: "Karoket", price: 8000 },
    6: { name: "Risol", price: 16000 },
    // Tambahan barang lain jika diinginkan
};

// Fungsi untuk menambahkan barang ke keranjang
function tambahBarang(id) {
    if (cart[id]) {
        cart[id]++;
    } else {
        cart[id] = 1;
    }
    updateCart();
    document.getElementById("quantity-" + id).value = cart[id];
}

// Fungsi untuk mengurangi barang dari keranjang
function kurangBarang(id) {
    if (cart[id]) {
        cart[id]--;
        if (cart[id] == 0) {
            delete cart[id];
        }
    }
    updateCart();
}

// Fungsi untuk mengupdate tampilan keranjang
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const totalTax = document.getElementById("total-tax");
    const totalShop = document.getElementById("total-shop");
    cartItems.innerHTML = "";
    let total = 0;
    let tax = 0;
    let shop = 0;

    for (const id in cart) {
        if (products[id]) {
            const cartItem = document.createElement("li");
            const product = products[id];
            cartItem.textContent = `${product.name}: ${cart[id]}`;
            cartItems.appendChild(cartItem);
            total += cart[id] * product.price;
            tax = total * taxRate;
        }
    }

    totalPrice.textContent = formatIDR(total);
    totalTax.textContent = formatIDR(tax);

    shop = total + tax;
    totalShop.textContent = formatIDR(shop);
    pesanButton();
}

// Event listener untuk tombol "Pesan Makanan".
function pesanButton(){
const pesanButton = document.getElementById("pesan-button");
pesanButton.addEventListener("click", () => {
    // Reset keranjang belanja
    for (const id in cart) {
        delete cart[id];
        const inputText = document.getElementById("quantity-" + id);
        inputText.value = 0;
    }
    // Memanggil fungsi updateCart untuk memperbarui tampilan keranjang belanja yang sudah kosong.
    updateCart();
    // Setelah pesanan berhasil dan keranjang dikosongkan, tampilkan notifikasi.
    showPesanNotif();
});
}

// Fungsi untuk menampilkan notifikasi pesan berhasil.
function showPesanNotif() {
    const pesanNotif = document.getElementById("pesan-notif");
    pesanNotif.style.display = "block";
    setTimeout(() => {
        pesanNotif.style.display = "none";
    }, 2000); // Notifikasi akan hilang setelah 2 detik.
}

function formatIDR(number) {
    if (!Number.isInteger(number) || number < 0) {
      return "Invalid input";
    }
    const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Add "IDR" symbol and return the formatted string
    return ` Rp. ${formattedNumber}`;
  }