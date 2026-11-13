# 🎂 Sistema de Gestão em Nuvem — Mary Bru Doçuras

Sistema web administrativo desenvolvido sob medida para gerenciar encomendas e acompanhar o faturamento de uma confeitaria artesanal, substituindo anotações manuais em cadernos por uma plataforma segura e acessível de qualquer dispositivo.

## ✨ Funcionalidades Principais

- **Autenticação Segura:** Tela de login restrita para o administrador utilizando Supabase Auth (e-mail e senha).
- **Dashboard Financeiro Dinâmico:** Cálculo automático em tempo real do total de pedidos registrados, encomendas pendentes de entrega e faturamento acumulado.
- **Gerenciamento de Encomendas (CRUD Completo):**
  - Cadastro de novos pedidos com nome do cliente, produto, data de entrega, valor e status (*Pendente*, *Em Produção*, *Entregue*).
  - Listagem organizada automaticamente pela data de entrega mais próxima.
  - Atualização rápida de status para **Entregue** com apenas um clique.
  - Exclusão de registros com janela de confirmação para evitar acidentes.
- **Proteção de Dados (RLS):** Políticas de *Row Level Security* configuradas diretamente no banco de dados para impedir qualquer acesso de usuários não autenticados.
- **Design Responsivo (Mobile-First):** Interface leve e adaptada para uso prático tanto no celular quanto no computador.

## 🛠️ Tecnologias e Ferramentas

- **Front-end:** HTML5, CSS3 e JavaScript (ES6+)
- **Back-end as a Service & Banco de Dados:** [Supabase](https://supabase.com) (PostgreSQL, Auth e RLS)
- **Versionamento e Deploy:** Git, GitHub e hospedagem em nuvem na [Vercel](https://vercel.com)

## 🚀 Como executar o projeto localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com
   ```
2. Crie um projeto gratuito no **Supabase**, habilite a autenticação por e-mail/senha e crie uma tabela chamada `encomendas` com as colunas `cliente` (text), `produto` (text), `data_entrega` (date), `valor` (numeric) e `status` (text).
3. Ative o **Row Level Security (RLS)** na tabela liberando acesso completo apenas para usuários autenticados (`authenticated`).
4. Insira a `SUPABASE_URL` e a `Publishable Key` do seu projeto no arquivo `script.js`.
5. Abra o arquivo `index.html` utilizando a extensão **Live Server** no VS Code.

---

Desenvolvido por **Ingrid** 👩‍💻 | Conecte-se comigo no [LinkedIn]https://www.linkedin.com/feed/
