const express = require('express');
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// 1. TRACKER (Middleware): Prints message to terminal for every visit
app.use((req, res, next) => {
    console.log(`Customer visited ${req.originalUrl} using ${req.method}`);
    next();
});

// Inventory Data
let inventory = [
    { id: 1, name: "Sindhi Ajrak", price: 3000, pattern: "Traditional Block Print" },
    { id: 2, name: "Sindhi Topi", price: 1200, pattern: "Handmade Mirror Work" }
];

// GET Route: View all items
app.get('/items', (req, res) => {
    res.status(200).json(inventory);
});

// POST Route: Add a new item
app.post('/items', (req, res) => {
    const newItem = {
        id: inventory.length + 1,
        name: req.body.name,
        price: req.body.price,
        // CRITICAL THINKING: 'pattern' property added.
        // Reason: In TMK, the value of Ajrak/Topi depends on the complexity 
        // of the pattern (Block print vs Hand print).
        pattern: req.body.pattern || "General Design"
    };
    inventory.push(newItem);
    res.status(201).json(newItem);
});

// 404 Middleware: For wrong addresses (like /biryani)
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found (TMK Shop doesn't have this page!)");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Question 1 Server is running on http://localhost:${PORT}`);
});