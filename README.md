# PriceWatch - Frontend

Interface React para o sistema de monitoramento de preços.

## Tecnologias

- React 18
- Tailwind CSS v4
- Lucide React (ícones)
- Axios

## Rodar local

```bash
# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env

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

## Deploy na Vercel

1. Conecte seu repositório GitHub na Vercel
2. Configure a variável de ambiente:
   - `VITE_API_URL` = URL do seu backend (ex: https://seu-backend.railway.app/api)
3. Deploy automático!

## Deploy na Netlify

1. Conecte seu repositório GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Configure variável `VITE_API_URL`
