# CryptoTracker - Dashboard em Tempo Real

Aplicação de monitoramento e análise de criptomoedas em tempo real com WebSockets.

---

## Como Executar o Projeto

### Requisitos

Certifique-se de possuir o Node.js e o gerenciador de pacotes **pnpm** instalados em sua máquina.

### Passo a Passo

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/LeonardoEnnes/FDFE-2026.git
   cd FDFE-2026
   ```

2. **Instalar as dependências:**

   ```bash
   pnpm install
   ```

3. **Executar em ambiente de desenvolvimento:**

   ```bash
   pnpm dev
   ```

   Acesse a aplicação localmente através do endereço: [http://localhost:3000](http://localhost:3000)

4. **Executar a suíte de testes unitários:**

   ```bash
   pnpm test
   ```

---

## Tecnologias Utilizadas

- **React 19 & TypeScript** - Tipagem estrita de dados em toda a aplicação (zero `any` explícito).
- **Vite** - Bundler de alta performance com gerenciamento personalizado de Path Aliases (`@/*`).
- **Tailwind CSS (v4.0)** - Estilização utilitária de alta velocidade e engine nativa.
- **Zustand (v5.0)** - Gerenciamento de estado global leve e persistente.
- **Binance WebSocket API** - Transmissão reativa contínua e nativa de dados diretamente do browser.
- **CoinGecko API** - Consumo de REST API externa para listagem estática do mercado.
- **Recharts** - Renderização de gráficos de linha otimizados para receber atualizações frequentes em tempo real.
- **Vitest & React Testing Library** - Infraestrutura para testes automatizados de componentes e estados.

---

## Estrutura do Projeto

```
src/
├── components/   # Componentes reutilizáveis (Layout Base e Sidebar)
├── pages/        # 5 telas da aplicação (Login, Dashboard, Explorar, Detalhes, Configurações)
├── hooks/        # Custom Hooks encapsulando o ciclo de vida dos WebSockets
├── store/        # Configuração e persistência do estado global com Zustand
├── types/        # Contratos e interfaces TypeScript
└── App.tsx       # gerenciamento do Roteamento e Guard de Rotas Protegidas
test/             # testes unitarios
```
