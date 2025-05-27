document.addEventListener('DOMContentLoaded', function() {
    fetch('/includes/track_ajax.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            page: window.location.href
        })
    })
    .catch(error => console.error('Errore nel tracking:', error));
}); 