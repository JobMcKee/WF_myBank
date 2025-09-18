// Banking Web Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Add event listeners for edit buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', handleEditTransaction);
    });

    // Add event listeners for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Update the account balance calculation
    updateAccountBalance();
}

function handleEditTransaction(event) {
    // Placeholder for edit functionality
    const transactionItem = event.target.closest('.transaction-item');
    const transactionName = transactionItem.querySelector('.transaction-name').textContent;
    
    // Simple alert for demonstration - in a real app, this would open an edit modal
    alert(`Edit transaction: ${transactionName}`);
    
    // Here you would typically:
    // 1. Open a modal with transaction details
    // 2. Allow user to edit amount, category, description, etc.
    // 3. Save changes and update the UI
}

function handleNavigation(event) {
    event.preventDefault();
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked nav item
    const navItem = event.target.closest('.nav-item');
    navItem.classList.add('active');
    
    // Get the target section
    const href = event.target.closest('.nav-link').getAttribute('href');
    
    if (href === '#money') {
        // Show money/transactions view (current default)
        showMoneyView();
    } else if (href === '#budget') {
        // Show budget view
        showBudgetView();
    }
}

function showMoneyView() {
    // This would show the transactions view
    // Currently, this is the default view shown
    console.log('Showing Money view');
}

function showBudgetView() {
    // This would show the budget view
    // For now, just show an alert
    alert('Budget view - Coming soon!');
    console.log('Showing Budget view');
}

function updateAccountBalance() {
    // Calculate the current balance from transactions
    const transactions = document.querySelectorAll('.transaction-amount');
    let balance = 0;
    
    transactions.forEach(transaction => {
        const amountText = transaction.textContent.replace(/[$,]/g, '');
        const amount = parseFloat(amountText);
        if (!isNaN(amount)) {
            balance += amount;
        }
    });
    
    // Update the balance display
    const balanceElement = document.querySelector('.balance-amount');
    if (balanceElement) {
        balanceElement.textContent = formatCurrency(balance);
        
        // Always keep the balance black as per requirements
        balanceElement.style.color = '#000000';
    }
}

function formatCurrency(amount) {
    // Format the amount as currency
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Utility function to add new transactions (for future use)
function addTransaction(name, amount, category, date) {
    // This would add a new transaction to the list
    // Implementation would depend on data storage solution
    console.log(`Adding transaction: ${name}, ${amount}, ${category}, ${date}`);
}

// Function to group transactions by month (already implemented in HTML structure)
function groupTransactionsByMonth() {
    // This function would dynamically group transactions by month
    // Currently, the grouping is static in the HTML
    console.log('Grouping transactions by month');
}