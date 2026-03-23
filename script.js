// 1. Cole aqui a URL da sua "Nova Implantação" do Google Sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbzXdoGYBraU9p4BNeOGncvRviujIZwhCzjqKHlMomHVfSZnpwqIv-QhXWF-WoYqxXKpJw/exec'; 
const form = document.querySelector('form');

const inputTelefone = document.getElementById('telefone');

inputTelefone.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo o que não é número
    
    // Formatação: (00) 00000-0000
    if (value.length > 0) {
        value = "(" + value;
    }
    if (value.length > 3) {
        value = value.slice(0, 3) + ") " + value.slice(3);
    }
    if (value.length > 10) {
        value = value.slice(0, 10) + "-" + value.slice(10);
    }
    
    // Limita o tamanho máximo para celular com 9 dígitos
    e.target.value = value.slice(0, 15); 
});

form.addEventListener('submit', e => {
    e.preventDefault(); // Impede a página de recarregar
    
    const btn = form.querySelector('.btn-submit');
    const originalText = btn.innerText;
    
    btn.innerText = "ENVIANDO...";
    btn.disabled = true;

    // Captura o valor do rádio selecionado (Normal ou Premium)
    const ingressoSelecionado = document.querySelector('input[name="ingresso"]:checked').value;

    // Organiza os dados para enviar (nomes devem bater com as colunas da planilha)
    const data = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        membro: document.getElementById('membro').value,
        ingresso: ingressoSelecionado
    };

    // Criar os parâmetros para o envio (método mais estável para Google Sheets)
    const params = new URLSearchParams();
    for (const key in data) {
        params.append(key, data[key]);
    }

    // Enviar para o Google
    fetch(`${scriptURL}?${params.toString()}`, { 
        method: 'POST'
    })
    .then(response => {
        alert('INSCRIÇÃO CONFIRMADA! Nos vemos na CONF 2K26.');
        btn.innerText = originalText;
        btn.disabled = false;
        form.reset(); // Limpa o formulário
    })
    .catch(error => {
        console.error('Erro!', error.message);
        alert('Houve um erro. Tente novamente ou fale com a liderança.');
        btn.innerText = originalText;
        btn.disabled = false;
    });
});