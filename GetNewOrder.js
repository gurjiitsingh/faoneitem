const fs = require('fs');
const path = require('path');

class Order {
    constructor() {
        this.AddInfo = null; // AddInfo
        this.OrderID = null; // String
        this.ArticleList = null; // ArticleList
        this.StoreData = null; // StoreData
        this.ServerData = null; // ServerData
        this.Customer = null; // Customer
    }
}

class OrderList {
    constructor() {
        this.Order = []; // Array of Order
        this.CreateDateTime = new Date().toISOString(); // Date
    }
}

class EShopOrder {
    constructor() {
        this.OrderList = new OrderList();
    }
}

const EShopOrders = new EShopOrder();

// Get all JSON files in the current directory
const files = fs.readdirSync('./');

files.forEach(file => {
    if (path.extname(file) === '.json') {
        try {
            const rawData = fs.readFileSync(file, 'utf-8');
            const order = JSON.parse(rawData);
            EShopOrders.OrderList.Order.push(order);
        } catch (error) {
            console.error(`Error reading or parsing ${file}:`, error);
        }
    }
});

// Convert to JSON format with pretty printing
const myJSON = JSON.stringify(EShopOrders, null, 2);

// Set response content-type to JSON (if using Express, for example)
// res.setHeader('Content-Type', 'application/json');

console.log(myJSON);
