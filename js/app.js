let transacoes = [
  {
    id: 1,
    destinatario: "Chave Aleatória (Conta Nova)",
    motivo: "Valor excede teto noturno (R$ 1.000)",
    detalhe: "23:15 • R$ 3.500,00",
    status: "BLOQUEADO"
  },
  {
    id: 2,
    destinatario: "Padaria Central LTDA",
    motivo: "Dentro do limite noturno permitido",
    detalhe: "21:10 • R$ 85,00",
    status: "APROVADO"
  },
  {
    id: 3,
    destinatario: "João Silva (Contato Salvo)",
    motivo: "Exige biometria facial (limite próximo)",
    detalhe: "20:45 • R$ 950,00",
    status: "ATENÇÃO"
  }
];

let filtroAtual = 'TODOS';

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function verificarHorarioNoturno(horarioStr) {
  const [hora] = horarioStr.split(':').map(Number);
  return hora >= 20 || hora < 6;
}

function simularPix() {
  const destinatario = document.getElementById('destinatario').value.trim();
  const valor = parseFloat(document.getElementById('valor').value);
  const horario = document.getElementById('horario').value;
  const confiavel = document.getElementById('confiavel').value;
  const limiteNoturno = parseFloat(document.getElementById('limiteNoturno').value) || 1000;

  if (!destinatario || isNaN(valor) || valor <= 0 || !horario) {
    alert("Preencha o destinatário, um valor válido e o horário.");
    return;
  }

  const ehNoturno = verificarHorarioNoturno(horario);
  let status = "APROVADO";
  let motivo = "Transação em horário diurno normal";

  if (ehNoturno) {
    if (valor > limiteNoturno && confiavel === "nao") {
      status = "BLOQUEADO";
      motivo = `Bloqueio preventivo: excede teto de ${formatarMoeda(limiteNoturno)} no período noturno`;
    } else if (valor > limiteNoturno && confiavel === "sim") {
      status = "ATENÇÃO";
      motivo = "Excede limite noturno, mas destinatário é confiável (Requer 2FA)";
    } else if (valor >= limiteNoturno * 0.8 && confiavel === "nao") {
      status = "ATENÇÃO";
      motivo = "Valor próximo ao teto noturno para conta desconhecida";
    } else {
      status = "APROVADO";
      motivo = "Dentro do limite de segurança noturno";
    }
  } else if (valor > 5000 && confiavel === "nao") {
    status = "ATENÇÃO";
    motivo = "Alerta antifraude: valor atípico diurno";
  }

  transacoes.unshift({
    id: Date.now(),
    destinatario,
    motivo,
    detalhe: `${horario} • ${formatarMoeda(valor)}`,
    status
  });

  document.getElementById('destinatario').value = '';
  document.getElementById('valor').value = '';
  renderizarTabela();
}

function excluirTransacao(id) {
  transacoes = transacoes.filter(t => t.id !== id);
  renderizarTabela();
}

function filtrar(status, botao) {
  filtroAtual = status;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  botao.classList.add('active');
  renderizarTabela();
}

function renderizarTabela() {
  const tbody = document.getElementById('tabelaLogs');
  tbody.innerHTML = '';

  const filtradas = filtroAtual === 'TODOS'
    ? transacoes
    : transacoes.filter(t => t.status === filtroAtual);

  filtradas.forEach(item => {
    let classeStatus = 'status-aprovado';
    if (item.status === 'BLOQUEADO') classeStatus = 'status-bloqueado';
    if (item.status === 'ATENÇÃO') classeStatus = 'status-atencao';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.destinatario}</strong></td>
      <td>${item.motivo}</td>
      <td>${item.detalhe}</td>
      <td><span class="status ${classeStatus}">${item.status}</span></td>
      <td><button class="btn-excluir" onclick="excluirTransacao(${item.id})">Excluir</button></td>
    `;
    tbody.appendChild(tr);
  });
}

renderizarTabela();