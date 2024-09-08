var InventoryManager = /** @class */ (function () {
    function InventoryManager() {
        this.products = [];
        this.loadHeaderFooter();
        this.initializeEventListeners();
        this.displayProducts();
    }
    InventoryManager.prototype.loadHeaderFooter = function () {
        this.loadComponent('header-component', './components/header.html');
        this.loadComponent('footer-component', './components/footer.html');
    };
    InventoryManager.prototype.loadComponent = function (tagName, filePath) {
        fetch(filePath)
            .then(function (response) { return response.text(); })
            .then(function (html) {
            document.querySelector(tagName).innerHTML = html;
        });
    };
    InventoryManager.prototype.initializeEventListeners = function () {
        var _this = this;
        var addButton = document.getElementById('add-product');
        addButton.addEventListener('click', function () { return _this.addProduct(); });
    };
    InventoryManager.prototype.displayProducts = function () {
        var tableBody = document.querySelector("#inventory-table tbody");
        tableBody.innerHTML = "";
        this.products.forEach(function (product) {
            var row = document.createElement("tr");
            row.innerHTML = "\n                <td>".concat(product.name, "</td>\n                <td>").concat(product.quantity, "</td>\n                <td>").concat(product.price.toFixed(2), "</td>\n            ");
            tableBody.appendChild(row);
        });
    };
    InventoryManager.prototype.addProduct = function () {
        var productNameInput = document.getElementById("product-name");
        var productQuantityInput = document.getElementById("product-quantity");
        var productPriceInput = document.getElementById("product-price");
        var newProduct = {
            name: productNameInput.value.trim(),
            quantity: parseInt(productQuantityInput.value),
            price: parseFloat(productPriceInput.value)
        };
        if (this.validateProduct(newProduct)) {
            this.products.push(newProduct);
            this.displayProducts();
            this.clearForm();
        }
    };
    InventoryManager.prototype.validateProduct = function (product) {
        if (product.name === "") {
            this.showAlert("Product name cannot be empty.");
            return false;
        }
        if (isNaN(product.quantity) || product.quantity <= 0) {
            this.showAlert("Quantity must be a positive number.");
            return false;
        }
        if (isNaN(product.price) || product.price <= 0) {
            this.showAlert("Price must be a valid number greater than 0.");
            return false;
        }
        return true;
    };
    InventoryManager.prototype.showAlert = function (message) {
        alert(message);
    };
    InventoryManager.prototype.clearForm = function () {
        document.getElementById("product-name").value = "";
        document.getElementById("product-quantity").value = "";
        document.getElementById("product-price").value = "";
    };
    return InventoryManager;
}());
document.addEventListener("DOMContentLoaded", function () {
    new InventoryManager();
});
