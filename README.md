# PriceWatch - Frontend

Interface React para o sistema de monitoramento de preços.

## Tecnologias

- React 18
- Tailwind CSS v4
- Lucide React (ícones)
- Axios

## Sites compatíveis

O scraper funciona com lojas que não bloqueiam requisições de servidores:

- **Kabum** - https://www.kabum.com.br
- **Trocafone** - https://www.trocafone.com

Lojas como Magazine Luiza, Americanas e Amazon utilizam proteção anti-bot que bloqueia IPs de datacenter.

## Rodar local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Configuração

Crie um arquivo `.env` com a URL da API:

```
VITE_API_URL=http://localhost:8000/api
```

## Deploy na Netlify

1. Conecte seu repositório GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Configure variável `VITE_API_URL`

## Repositórios

- Frontend: https://github.com/iagosoave/pricewatch-frontend
- Backend: https://github.com/iagosoave/backend-pricewatch
