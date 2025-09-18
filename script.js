// Sample transaction data with categories spanning multiple months
const transactions = [
    // February 2024
    { id: 1, title: "WALMART SUPERCENTER", amount: -87.42, date: "2024-02-15", type: "expense", category: "shop" },
    { id: 2, title: "SHELL OIL COMPANY", amount: -52.18, date: "2024-02-14", type: "expense", category: "gas" },
    { id: 3, title: "STARBUCKS STORE", amount: -8.95, date: "2024-02-13", type: "expense", category: "food" },
    { id: 4, title: "UBER EATS", amount: -28.75, date: "2024-02-12", type: "expense", category: "food" },
    { id: 5, title: "TARGET T-1234", amount: -63.21, date: "2024-02-11", type: "expense", category: "shop" },
    { id: 6, title: "NETFLIX.COM", amount: -15.99, date: "2024-02-10", type: "expense", category: "entertainment" },
    { id: 7, title: "FREELANCE PAYMENT", amount: 350.00, date: "2024-02-09", type: "income", category: "income" },
    { id: 8, title: "COSTCO WHOLESALE", amount: -189.47, date: "2024-02-08", type: "expense", category: "shop" },
    { id: 9, title: "AMAZON.COM SERVICES", amount: -156.78, date: "2024-02-07", type: "expense", category: "shop" },
    { id: 10, title: "MCDONALD'S F#12345", amount: -12.48, date: "2024-02-06", type: "expense", category: "food" },
    { id: 11, title: "HOME DEPOT #5678", amount: -234.56, date: "2024-02-05", type: "expense", category: "home" },
    { id: 12, title: "KROGER FUEL #9876", amount: -35.20, date: "2024-02-04", type: "expense", category: "gas" },
    { id: 13, title: "APPLE STORE ONLINE", amount: -99.99, date: "2024-02-03", type: "expense", category: "tech" },
    { id: 14, title: "SPOTIFY", amount: -9.99, date: "2024-02-02", type: "expense", category: "entertainment" },
    { id: 15, title: "VENMO PAYMENT", amount: 50.00, date: "2024-02-01", type: "income", category: "income" },
    
    // January 2024
    { id: 16, title: "DIRECT DEPOSIT PAYROLL", amount: 2450.00, date: "2024-01-31", type: "income", category: "income" },
    { id: 17, title: "WHOLE FOODS MARKET", amount: -78.34, date: "2024-01-30", type: "expense", category: "food" },
    { id: 18, title: "CHEVRON GAS STATION", amount: -45.67, date: "2024-01-29", type: "expense", category: "gas" },
    { id: 19, title: "BEST BUY STORES", amount: -299.99, date: "2024-01-28", type: "expense", category: "tech" },
    { id: 20, title: "CHIPOTLE MEXICAN GRILL", amount: -14.85, date: "2024-01-27", type: "expense", category: "food" },
    { id: 21, title: "PAYPAL LLC", amount: -25.99, date: "2024-01-26", type: "expense", category: "other" },
    { id: 22, title: "LOWES #1234", amount: -87.55, date: "2024-01-25", type: "expense", category: "home" },
    { id: 23, title: "MOBILE DEPOSIT", amount: 125.00, date: "2024-01-24", type: "income", category: "income" },
    { id: 24, title: "TRADER JOES", amount: -56.78, date: "2024-01-23", type: "expense", category: "food" },
    { id: 25, title: "EXXON MOBIL", amount: -41.20, date: "2024-01-22", type: "expense", category: "gas" }
];

// Get category icon based on category type
function getCategoryIcon(category) {
    const icons = {
        'food': 'fa-utensils',
        'gas': 'fa-gas-pump',
        'shop': 'fa-shopping-cart',
        'entertainment': 'fa-film',
        'home': 'fa-home',
        'tech': 'fa-laptop',
        'income': 'fa-arrow-up',
        'other': 'fa-question'
    };
    return icons[category] || 'fa-question';
}

// Format currency
function formatCurrency(amount) {
    const sign = amount >= 0 ? '+' : '-';
    const absAmount = Math.abs(amount);
    return `${sign}$${absAmount.toFixed(2)}`;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

// Create transaction item HTML
function createTransactionItem(transaction) {
    const isExpense = transaction.type === 'expense';
    const iconClass = getCategoryIcon(transaction.category);
    const typeClass = isExpense ? 'expense' : 'income';
    
    return `
        <div class="transaction-item" data-id="${transaction.id}">
            <div class="transaction-icon ${typeClass}">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="transaction-details">
                <div class="transaction-title" data-original-title="${transaction.title}">
                    ${transaction.title}
                </div>
                <div class="transaction-date">${formatDate(transaction.date)}</div>
                <div class="transaction-category">${transaction.category}</div>
            </div>
            <div class="transaction-amount ${typeClass}">
                ${formatCurrency(transaction.amount)}
            </div>
            <div class="transaction-actions">
                <button class="edit-btn" onclick="editTransaction(${transaction.id})" title="Edit transaction">
                    <i class="fas fa-pencil-alt"></i>
                </button>
            </div>
        </div>
    `;
}

// Group transactions by month
function groupTransactionsByMonth(transactions) {
    const grouped = {};
    transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
        const monthLabel = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        if (!grouped[monthKey]) {
            grouped[monthKey] = {
                label: monthLabel,
                transactions: []
            };
        }
        grouped[monthKey].transactions.push(transaction);
    });
    return grouped;
}

// Create month divider HTML
function createMonthDivider(monthLabel) {
    return `
        <div class="month-divider">
            <h3>${monthLabel}</h3>
        </div>
    `;
}

// Render all transactions with month grouping
function renderTransactions() {
    const transactionList = document.getElementById('transactionList');
    const groupedTransactions = groupTransactionsByMonth(transactions);
    
    let html = '';
    Object.keys(groupedTransactions)
        .sort((a, b) => b.localeCompare(a)) // Sort descending (newest first)
        .forEach(monthKey => {
            const group = groupedTransactions[monthKey];
            html += createMonthDivider(group.label);
            group.transactions.forEach(transaction => {
                html += createTransactionItem(transaction);
            });
        });
    
    transactionList.innerHTML = html;
}

// Edit transaction functionality
function editTransaction(id) {
    const transactionItem = document.querySelector(`[data-id="${id}"]`);
    const titleElement = transactionItem.querySelector('.transaction-title');
    const actionsElement = transactionItem.querySelector('.transaction-actions');
    const originalTitle = titleElement.dataset.originalTitle;
    
    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalTitle;
    input.className = 'transaction-title-input';
    input.maxLength = 50;
    
    // Create save and cancel buttons
    const editActions = document.createElement('div');
    editActions.className = 'edit-actions';
    editActions.innerHTML = `
        <button class="save-btn" onclick="saveTransaction(${id})">
            <i class="fas fa-check"></i>
        </button>
        <button class="cancel-btn" onclick="cancelEdit(${id})">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Replace title with input
    titleElement.style.display = 'none';
    titleElement.parentNode.insertBefore(input, titleElement);
    
    // Replace edit button with save/cancel buttons
    actionsElement.innerHTML = '';
    actionsElement.appendChild(editActions);
    
    // Focus on input and select text
    input.focus();
    input.select();
    
    // Handle Enter key to save
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            saveTransaction(id);
        } else if (e.key === 'Escape') {
            cancelEdit(id);
        }
    });
}

// Save transaction changes
function saveTransaction(id) {
    const transactionItem = document.querySelector(`[data-id="${id}"]`);
    const input = transactionItem.querySelector('.transaction-title-input');
    const titleElement = transactionItem.querySelector('.transaction-title');
    const actionsElement = transactionItem.querySelector('.transaction-actions');
    
    const newTitle = input.value.trim();
    
    if (newTitle === '') {
        alert('Transaction title cannot be empty');
        input.focus();
        return;
    }
    
    // Update the transaction in our data
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
        transaction.title = newTitle;
        titleElement.textContent = newTitle;
        titleElement.dataset.originalTitle = newTitle;
    }
    
    // Remove input and restore title
    input.remove();
    titleElement.style.display = 'block';
    
    // Restore edit button
    actionsElement.innerHTML = `
        <button class="edit-btn" onclick="editTransaction(${id})" title="Edit transaction">
            <i class="fas fa-pencil-alt"></i>
        </button>
    `;
}

// Cancel edit mode
function cancelEdit(id) {
    const transactionItem = document.querySelector(`[data-id="${id}"]`);
    const input = transactionItem.querySelector('.transaction-title-input');
    const titleElement = transactionItem.querySelector('.transaction-title');
    const actionsElement = transactionItem.querySelector('.transaction-actions');
    
    // Remove input and restore title
    input.remove();
    titleElement.style.display = 'block';
    
    // Restore edit button
    actionsElement.innerHTML = `
        <button class="edit-btn" onclick="editTransaction(${id})" title="Edit transaction">
            <i class="fas fa-pencil-alt"></i>
        </button>
    `;
}

// Calculate total account balance
function calculateAccountBalance() {
    return transactions.reduce((total, transaction) => {
        return total + transaction.amount;
    }, 0);
}

// Update account balance display
function updateAccountBalance() {
    const balance = calculateAccountBalance();
    const balanceElement = document.getElementById('accountBalance');
    balanceElement.textContent = formatCurrency(balance);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderTransactions();
    updateAccountBalance();
    
    // Add some interactive features to sidebar
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});