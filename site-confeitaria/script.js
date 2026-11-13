const SUPABASE_URL = 'https://gtddpjdtrklctyumyaki.supabase.co';
const SUPABASE_KEY = 'sb_publishable_NqvqFgdFjuHJKWpW-1VZrA_84PJbRgK';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

const telaLogin = document.getElementById('tela-login');
const painelSistema = document.getElementById('painel-sistema');
const formLogin = document.getElementById('form-login');
const erroLogin = document.getElementById('erro-login');
const btnSair = document.getElementById('btn-sair');
const formEncomenda = document.getElementById('form-encomenda');
const listaEncomendas = document.getElementById('lista-encomendas');

// Verifica se o dono já está logado
async function verificarSessao() {
    const { data: { session } } = await db.auth.getSession();
    if (session) {
        telaLogin.classList.add('oculto');
        painelSistema.classList.remove('oculto');
        carregarEncomendas();
    } else {
        telaLogin.classList.remove('oculto');
        painelSistema.classList.add('oculto');
    }
}

// Fazer Login
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    erroLogin.textContent = 'Entrando...';
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('senha-login').value;

    const { error } = await db.auth.signInWithPassword({ email, password });

    if (error) {
        erroLogin.textContent = 'E-mail ou senha incorretos.';
    } else {
        erroLogin.textContent = '';
        verificarSessao();
    }
});

// Fazer Logout
btnSair.addEventListener('click', async () => {
    await db.auth.signOut();
    verificarSessao();
});

// Salvar Nova Encomenda
formEncomenda.addEventListener('submit', async (e) => {
    e.preventDefault();
    const novaEncomenda = {
        cliente: document.getElementById('cliente').value,
        produto: document.getElementById('produto').value,
        data_entrega: document.getElementById('data_entrega').value,
        valor: parseFloat(document.getElementById('valor').value),
        status: document.getElementById('status').value
    };

    const { error } = await db.from('encomendas').insert([novaEncomenda]);

    if (error) {
        alert('Erro ao salvar pedido: ' + error.message);
    } else {
        formEncomenda.reset();
        carregarEncomendas();
    }
});

// Listar Encomendas e Calcular Resumo
async function carregarEncomendas() {
    const { data, error } = await db
        .from('encomendas')
        .select('*')
        .order('data_entrega', { ascending: true });

    if (error) {
        console.error(error);
        return;
    }

    listaEncomendas.innerHTML = '';
    let totalPedidos = data.length;
    let pendentes = 0;
    let faturamento = 0;

    data.forEach((item) => {
        if (item.status !== 'Entregue') pendentes++;
        faturamento += Number(item.valor || 0);

        const dataFormatada = item.data_entrega.split('-').reverse().join('/');
        const valorFormatado = Number(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${dataFormatada}</td>
            <td><strong>${item.cliente}</strong></td>
            <td>${item.produto}</td>
            <td>${valorFormatado}</td>
            <td>${item.status}</td>
            <td>
                ${item.status !== 'Entregue' ? `<button class="btn-acao btn-concluir" onclick="marcarEntregue(${item.id})">Entregar</button>` : ''}
                <button class="btn-acao btn-excluir" onclick="excluirPedido(${item.id})">Excluir</button>
            </td>
        `;
        listaEncomendas.appendChild(tr);
    });

    document.getElementById('total-pedidos').textContent = totalPedidos;
    document.getElementById('pedidos-pendentes').textContent = pendentes;
    document.getElementById('faturamento-total').textContent = faturamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Marcar como Entregue
async function marcarEntregue(id) {
    await db.from('encomendas').update({ status: 'Entregue' }).eq('id', id);
    carregarEncomendas();
}

// Excluir Pedido
async function excluirPedido(id) {
    if (confirm('Deseja realmente excluir este pedido?')) {
        await db.from('encomendas').delete().eq('id', id);
        carregarEncomendas();
    }
}

verificarSessao();