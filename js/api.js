const API_URL = 'http://localhost:3001';

async function handleResponse(resposta) {
  if (resposta.status === 204) {
    return;
  }

  const dados = await resposta.json();

  if (!resposta.ok){
    const mensagemDeErro = dados.error || `Erro ${resposta.status}`;
    throw new Error(mensagemDeErro);
  }

  return dados;
}

//login corretor
async function login(email, senha) {
  const resposta = await fetch(`${API_URL}/corretores/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  const dados = await handleResponse(resposta);

  if (dados.token) {
    localStorage.setItem('authToken', dados.token);
  }
  return dados;
}

async function cadastrarCorretor(dadosCorretor) {
  const resposta = await fetch(`${API_URL}/corretores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosCorretor)
  });
  return handleResponse(resposta);
}

async function criarImovel(dadosImovel) {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('Token de autenticação não encontrado.');

  const resposta = await fetch(`${API_URL}/imoveis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(dadosImovel)
  });
  return handleResponse(resposta);
}

async function listarImoveis() {
  const resposta = await fetch(`${API_URL}/imoveis`);
  return handleResponse(resposta);
}

async function buscarImovelPorId(id) {
  const resposta = await fetch(`${API_URL}/imoveis/${id}`);
  return handleResponse(resposta);
}

async function atualizarImovel(id, dadosParaAtualizar) {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('Token de autenticação não encontrado.');

  const resposta = await fetch(`${API_URL}/imoveis/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(dadosParaAtualizar)
  });
  return handleResponse(resposta);
}

async function deletarImovel(id) {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('Token de autenticação não encontrado.');

  const resposta = await fetch(`${API_URL}/imoveis/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(resposta);
}