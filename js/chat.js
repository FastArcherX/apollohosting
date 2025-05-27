class ChatWidget {
    constructor() {
        this.widget = document.getElementById('chatWidget');
        this.toggleBtn = document.getElementById('chatToggle');
        this.closeBtn = document.getElementById('closeChat');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendMessage');
        this.messagesContainer = document.getElementById('chatMessages');
        
        this.userId = localStorage.getItem('chatUserId') || this.generateUserId();
        this.isOpen = false;
        this.setupEventListeners();
        this.startMessagePolling();
    }

    generateUserId() {
        const userId = Math.random().toString(36).substring(7);
        localStorage.setItem('chatUserId', userId);
        return userId;
    }

    setupEventListeners() {
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        try {
            const response = await fetch('http://localhost:3000/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: this.userId,
                    message: message,
                    sender: 'user'
                })
            });

            if (response.ok) {
                this.messageInput.value = '';
                this.addMessage(message, 'user');
            }
        } catch (error) {
            console.error('Errore invio messaggio:', error);
        }
    }

    async getMessages() {
        try {
            const response = await fetch(`http://localhost:3000/api/messages/${this.userId}`);
            const messages = await response.json();
            
            // Pulisci il container dei messaggi
            this.messagesContainer.innerHTML = '';
            
            // Aggiungi tutti i messaggi
            messages.forEach(msg => {
                this.addMessage(msg.message, msg.sender);
            });
        } catch (error) {
            console.error('Errore recupero messaggi:', error);
        }
    }

    startMessagePolling() {
        // Controlla nuovi messaggi ogni 2 secondi
        setInterval(() => {
            if (this.isOpen) {
                this.getMessages();
            }
        }, 2000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.widget.style.display = this.isOpen ? 'flex' : 'none';
        
        if (this.isOpen) {
            this.getMessages();
        }
    }
}

// Inizializza la chat quando il documento è caricato
document.addEventListener('DOMContentLoaded', () => {
    new ChatWidget();
}); 