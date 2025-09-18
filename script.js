// Sample transaction data
const transactions = [
    { id: 1, title: "WALMART SUPERCENTER", amount: -87.42, date: "2024-01-15", type: "expense" },
    { id: 2, title: "PAYPAL LLC", amount: -25.99, date: "2024-01-14", type: "expense" },
    { id: 3, title: "AMAZON.COM SERVICES", amount: -156.78, date: "2024-01-13", type: "expense" },
    { id: 4, title: "DIRECT DEPOSIT PAYROLL", amount: 2450.00, date: "2024-01-12", type: "income" },
    { id: 5, title: "STARBUCKS STORE", amount: -8.95, date: "2024-01-11", type: "expense" },
    { id: 6, title: "SHELL OIL COMPANY", amount: -42.33, date: "2024-01-10", type: "expense" },
    { id: 7, title: "TARGET T-1234", amount: -63.21, date: "2024-01-09", type: "expense" },
    { id: 8, title: "NETFLIX.COM", amount: -15.99, date: "2024-01-08", type: "expense" },
    { id: 9, title: "COSTCO WHOLESALE", amount: -189.47, date: "2024-01-07", type: "expense" },
    { id: 10, title: "VENMO PAYMENT", amount: 50.00, date: "2024-01-06", type: "income" },
    { id: 11, title: "MCDONALD'S F#12345", amount: -12.48, date: "2024-01-05", type: "expense" },
    { id: 12, title: "HOME DEPOT #5678", amount: -234.56, date: "2024-01-04", type: "expense" },
    { id: 13, title: "UBER EATS", amount: -28.75, date: "2024-01-03", type: "expense" },
    { id: 14, title: "KROGER FUEL #9876", amount: -35.20, date: "2024-01-02", type: "expense" },
    { id: 15, title: "APPLE STORE ONLINE", amount: -99.99, date: "2024-01-01", type: "expense" }
];

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
    const iconClass = isExpense ? 'fa-arrow-down' : 'fa-arrow-up';
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

// Render all transactions
function renderTransactions() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = transactions.map(createTransactionItem).join('');
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

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderTransactions();
    
    // Add some interactive features to sidebar
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});