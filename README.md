# Simulador de Segurança: Pix Noturno

Aplicação web interativa desenvolvida para simular regras antifraude e limites de transferência no período noturno (20:00 às 05:59), inspirada nas diretrizes de segurança do Banco Central.

## Funcionalidades
- **Configuração de Limite Noturno:** Definição dinâmica do teto de valor (R$) para o período noturno.
- **Simulador de Transações:** Teste de transferências com destinatário, valor, horário e nível de confiança do contato.
- **Classificação de Risco:** Identificação automática de transações **Aprovadas**, **Bloqueadas** ou em **Análise / 2FA**.
- **Filtros e Auditoria:** Visualização filtrada do histórico de simulações e exclusão de registos.
- **Design Responsivo:** Layout adaptado para desktop e dispositivos móveis.

## Estrutura do Projeto
```text
├── index.html
├── README.md
├── css/
│   └── style.css
└── js/
    └── app.js