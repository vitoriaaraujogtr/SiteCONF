// Substitua pela URL que você acabou de copiar
const scriptURL = 'https://script.google.com/macros/s/AKfycbyS_Y5wna8JE76XjMbCXyAWmJsyGmcpdqEexkViHUqL/dev'; 
const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const btn = form.querySelector('button');
    const originalText = btn.innerText;
    
    // Feedback visual para o usuário
    btn.innerText = "ENVIANDO...";
    btn.disabled = true;

    // Captura os dados exatamente como estão no HTML
    const formData = new FormData(form);
    const data = {
        nome: document.getElementById('NOME').value,
        telefone: document.getElementById('TELEFONE').value,
        membro: document.getElementById('MEMBRO').value,
        ingresso: document.getElementById('INGRESSO').value
    };

    // Envio para o Google Sheets
    fetch(scriptURL, { 
        method: 'POST', 
        mode: 'no-cors', // Importante para evitar erros de política Cross-Origin
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        // Como o 'no-cors' não retorna resposta JSON, assumimos o sucesso aqui
        alert('INSCRIÇÃO CONFIRMADA! Te esperamos na CONF 2K26.');
        btn.innerText = originalText;
        btn.disabled = false;
        form.reset();
    })
    .catch(error => {
        console.error('Erro!', error.message);
        alert('Houve um problema. Tente novamente ou nos contate via WhatsApp.');
        btn.innerText = originalText;
        btn.disabled = false;
    });
});