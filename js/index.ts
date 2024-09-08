interface Product {
    name: string;
    quantity: number;
    price: number;
}

class InventoryManager {
    private products: Product[] = [];

    constructor() {
        this.loadHeaderFooter();
        this.initializeEventListeners();
        this.displayProducts();
    }

    private loadHeaderFooter(): void {
        this.loadComponent('header-component', './components/header.html');
        this.loadComponent('footer-component', './components/footer.html');
    }

    private loadComponent(tagName: string, filePath: string): void {
        fetch(filePath)
            .then(response => response.text())
            .then(html => {
                document.querySelector(tagName)!.innerHTML = html;
            });
    }

    private initializeEventListeners(): void {
        const addButton = document.getElementById('add-product') as HTMLButtonElement;
        addButton.addEventListener('click', () => this.addProduct());
    }

    private displayProducts(): void {
        const tableBody = document.querySelector("#inventory-table tbody") as HTMLTableSectionElement;
        tableBody.innerHTML = "";

        this.products.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    private addProduct(): void {
        const productNameInput = document.getElementById("product-name") as HTMLInputElement;
        const productQuantityInput = document.getElementById("product-quantity") as HTMLInputElement;
        const productPriceInput = document.getElementById("product-price") as HTMLInputElement;

        const newProduct: Product = {
            name: productNameInput.value.trim(),
            quantity: parseInt(productQuantityInput.value),
            price: parseFloat(productPriceInput.value)
        };

        if (this.validateProduct(newProduct)) {
            this.products.push(newProduct);
            this.displayProducts();
            this.clearForm();
        }
    }

    private validateProduct(product: Product): boolean {
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
    }

    private showAlert(message: string): void {
        alert(message);
    }

    private clearForm(): void {
        (document.getElementById("product-name") as HTMLInputElement).value = "";
        (document.getElementById("product-quantity") as HTMLInputElement).value = "";
        (document.getElementById("product-price") as HTMLInputElement).value = "";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new InventoryManager();
});
