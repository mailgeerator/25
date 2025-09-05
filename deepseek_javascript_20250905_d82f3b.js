document.addEventListener('DOMContentLoaded', function() {
    const emailDisplay = document.getElementById('emailDisplay');
    const copyBtn = document.getElementById('copyBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const refreshInboxBtn = document.getElementById('refreshInboxBtn');
    const domainButtons = document.querySelectorAll('.domain-btn');
    const emailList = document.getElementById('emailList');
    
    let currentDomain = '@tempmailo.com';
    let currentUsername = '';
    
    // Generate random username
    function generateUsername() {
        const adjectives = ['quick', 'clever', 'smart', 'fast', 'easy', 'secure', 'private', 'safe', 'cool', 'free'];
        const nouns = ['fox', 'cat', 'dog', 'bird', 'tiger', 'lion', 'bear', 'wolf', 'eagle', 'hawk'];
        const numbers = Math.floor(100 + Math.random() * 900);
        
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        
        return adj + noun + numbers;
    }
    
    // Generate new email
    function generateEmail() {
        currentUsername = generateUsername();
        updateEmailDisplay();
    }
    
    // Update email display
    function updateEmailDisplay() {
        emailDisplay.textContent = currentUsername + currentDomain;
    }
    
    // Copy email to clipboard
    copyBtn.addEventListener('click', function() {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = currentUsername + currentDomain;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    });
    
    // Refresh email
    refreshBtn.addEventListener('click', generateEmail);
    
    // Refresh inbox
    refreshInboxBtn.addEventListener('click', function() {
        // Visual feedback
        refreshInboxBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
        setTimeout(() => {
            refreshInboxBtn.innerHTML = '<i class="fas fa-redo"></i> Refresh';
            
            // Simulate new email
            if (Math.random() > 0.7) {
                const senders = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'Newsletter Service', 'Promotion Team'];
                const subjects = ['Verify your account', 'Your verification code', 'Special offer for you', 'Confirm your subscription'];
                
                const newEmail = document.createElement('li');
                newEmail.className = 'email-item';
                newEmail.innerHTML = `
                    <i class="fas fa-envelope"></i>
                    <div class="email-info">
                        <div class="email-sender">${senders[Math.floor(Math.random() * senders.length)]}</div>
                        <div class="email-subject">${subjects[Math.floor(Math.random() * subjects.length)]}</div>
                    </div>
                    <div class="email-time">Just now</div>
                `;
                
                emailList.insertBefore(newEmail, emailList.firstChild);
            }
        }, 1500);
    });
    
    // Domain selection
    domainButtons.forEach(button => {
        button.addEventListener('click', function() {
            domainButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentDomain = this.getAttribute('data-domain');
            updateEmailDisplay();
        });
    });
    
    // Initialize
    generateEmail();
});