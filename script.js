// Transaction categories with their Unicode symbols
const categoryIcons = {
    food: '🍽️',
    gas: '⛽',
    shop: '🛍️',
    income: '💰',
    bills: '📄',
    entertainment: '🎬',
    healthcare: '❤️',
    other: '❓'
};

// Sample transaction data spanning multiple months
const transactions = [
    // December 2023
    { id: 1, description: "Salary Deposit", amount: 3200.00, date: "2023-12-28", category: "income" },
    { id: 2, description: "Grocery Store", amount: -67.89, date: "2023-12-27", category: "food" },
    { id: 3, description: "Gas Station", amount: -45.20, date: "2023-12-26", category: "gas" },
    { id: 4, description: "Netflix Subscription", amount: -15.99, date: "2023-12-25", category: "entertainment" },
    { id: 5, description: "Amazon Purchase", amount: -123.45, date: "2023-12-24", category: "shop" },
    { id: 6, description: "Electric Bill", amount: -89.34, date: "2023-12-22", category: "bills" },
    { id: 7, description: "Restaurant", amount: -34.67, date: "2023-12-21", category: "food" },
    { id: 8, description: "Doctor Visit", amount: -150.00, date: "2023-12-20", category: "healthcare" },
    { id: 9, description: "Coffee Shop", amount: -5.75, date: "2023-12-19", category: "food" },
    { id: 10, description: "Gas Station", amount: -52.10, date: "2023-12-18", category: "gas" },
    
    // November 2023
    { id: 11, description: "Salary Deposit", amount: 3200.00, date: "2023-11-30", category: "income" },
    { id: 12, description: "Rent Payment", amount: -1200.00, date: "2023-11-29", category: "bills" },
    { id: 13, description: "Grocery Store", amount: -78.92, date: "2023-11-28", category: "food" },
    { id: 14, description: "Movie Theater", amount: -28.50, date: "2023-11-27", category: "entertainment" },
    { id: 15, description: "Gas Station", amount: -41.75, date: "2023-11-26", category: "gas" },
    { id: 16, description: "Online Shopping", amount: -95.30, date: "2023-11-25", category: "shop" },
    { id: 17, description: "Restaurant", amount: -56.80, date: "2023-11-24", category: "food" },
    { id: 18, description: "Phone Bill", amount: -65.00, date: "2023-11-23", category: "bills" },
    { id: 19, description: "Pharmacy", amount: -23.45, date: "2023-11-22", category: "healthcare" },
    { id: 20, description: "Coffee Shop", amount: -4.95, date: "2023-11-21", category: "food" },
    { id: 21, description: "Gas Station", amount: -48.60, date: "2023-11-20", category: "gas" },
    { id: 22, description: "Freelance Work", amount: 450.00, date: "2023-11-19", category: "income" },
    { id: 23, description: "Department Store", amount: -167.89, date: "2023-11-18", category: "shop" },
    { id: 24, description: "Internet Bill", amount: -79.99, date: "2023-11-17", category: "bills" },
    { id: 25, description: "Fast Food", amount: -12.34, date: "2023-11-16", category: "food" },
    
    // October 2023
    { id: 26, description: "Salary Deposit", amount: 3200.00, date: "2023-10-31", category: "income" },
    { id: 27, description: "Rent Payment", amount: -1200.00, date: "2023-10-30", category: "bills" },
    { id: 28, description: "Halloween Costumes", amount: -75.99, date: "2023-10-29", category: "shop" },
    { id: 29, description: "Grocery Store", amount: -89.45, date: "2023-10-28", category: "food" },
    { id: 30, description: "Gas Station", amount: -43.20, date: "2023-10-27", category: "gas" }
];

// Sort transactions by date (newest first)
transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

// Group transactions by month-year
function groupTransactionsByMonth(transactions) {
    const grouped = {};
    
    transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const monthYear = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
        });
        
        if (!grouped[monthYear]) {
            grouped[monthYear] = [];
        }
        grouped[monthYear].push(transaction);
    });
    
    return grouped;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(Math.abs(amount));
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
}

// Create transaction item HTML
function createTransactionItem(transaction) {
    const isPositive = transaction.amount >= 0;
    const iconSymbol = categoryIcons[transaction.category] || categoryIcons.other;
    
    return `
        <div class="transaction-item" data-id="${transaction.id}">
            <div class="transaction-icon ${transaction.category}">
                ${iconSymbol}
            </div>
            <div class="transaction-details">
                <div class="transaction-main">
                    <div class="transaction-description">${transaction.description}</div>
                    <div class="transaction-amount ${isPositive ? 'positive' : 'negative'}">
                        ${isPositive ? '+' : '-'}${formatCurrency(transaction.amount)}
                    </div>
                </div>
                <div class="transaction-meta">
                    <div class="transaction-date">${formatDate(transaction.date)}</div>
                    <div class="transaction-category">${transaction.category}</div>
                </div>
            </div>
            <button class="transaction-edit" title="Edit transaction">
                ✏️
            </button>
        </div>
    `;
}

// Render transactions
function renderTransactions() {
    const container = document.getElementById('transactions-container');
    const groupedTransactions = groupTransactionsByMonth(transactions);
    
    let html = '';
    
    Object.entries(groupedTransactions).forEach(([monthYear, monthTransactions]) => {
        html += `<div class="month-divider">${monthYear}</div>`;
        
        monthTransactions.forEach(transaction => {
            html += createTransactionItem(transaction);
        });
    });
    
    container.innerHTML = html;
    
    // Add click event listeners for edit buttons
    container.addEventListener('click', (e) => {
        if (e.target.closest('.transaction-edit')) {
            const transactionItem = e.target.closest('.transaction-item');
            const transactionId = transactionItem.dataset.id;
            editTransaction(transactionId);
        }
    });
}

// Edit transaction function (placeholder)
function editTransaction(transactionId) {
    const transaction = transactions.find(t => t.id == transactionId);
    if (transaction) {
        alert(`Edit transaction: ${transaction.description}\nAmount: ${formatCurrency(transaction.amount)}\nCategory: ${transaction.category}`);
        // Here you would implement the actual edit functionality
    }
}

// Navigation functionality
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Here you would implement navigation logic
            const href = item.querySelector('a').getAttribute('href');
            if (href === '#money') {
                // Show money/transactions view (current view)
            } else if (href === '#budget') {
                // Show budget view (placeholder)
                alert('Budget view - Feature coming soon!');
            }
        });
    });
}

// Calculate and update account balance
function updateAccountBalance() {
    const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    const balanceElement = document.querySelector('.account-balance');
    balanceElement.textContent = formatCurrency(balance);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderTransactions();
    initNavigation();
    updateAccountBalance();
});

// Handle window resize for mobile responsiveness
window.addEventListener('resize', () => {
    // Any resize-specific logic can go here
});