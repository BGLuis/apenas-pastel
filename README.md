# 🥟 Apenas Pastel · Pastelaria Artesanal

> *Crocante por fora, recheado até a borda.*

Aplicação web moderna, responsiva e interativa desenvolvida com base no design do Figma (Mobile & Desktop) para a pastelaria artesanal **Apenas Pastel** (Barroca, Belo Horizonte - MG).

---

## 🚀 Live Demo & Links

- 🌐 **Deploy na Vercel**: [https://apenas-pastel-remaster-hd.vercel.app](https://apenas-pastel-remaster-hd.vercel.app)
- 📦 **Repositório GitHub**: [https://github.com/BGLuis/apenas-pastel](https://github.com/BGLuis/apenas-pastel)
- 🎨 **Figma Design**:
  - [Mobile (Node 2:3)](https://www.figma.com/design/LJd6nBzQlj6H8KiSV12TtK/Apenas-pastel?node-id=2-3)
  - [Desktop (Node 2:4)](https://www.figma.com/design/LJd6nBzQlj6H8KiSV12TtK/Apenas-pastel?node-id=2-4)

---

## ✨ Recursos & Funcionalidades

- **📱 Design Mobile-First & Desktop Responsivo**: Adaptação fluida do viewport de 390px ao desktop de 1440px.
- **🥟 Borda de Pastel Vetorial**: Divisor de seção personalizado reproduzindo o fechamento com garfo tradicional de pastel de feira.
- **⚡ Saindo da Fritadeira**: Carrossel horizontal de fornadas com status ao vivo pulsante.
- **🏷️ Detalhe do Produto com Drawer Tátil (`vaul`)**:
  - Seleção de adicionais (borda de catupiry, queijo extra, vinagrete).
  - Campo de observações personalizadas.
  - Fatos rápidos: tempo de preparo, picância e porções.
  - Seletor dinâmico de quantidade.
- **🛍️ Sacola Interativa & Cálculo de Frete Grátis**:
  - Barra de progresso dinâmica em direção à meta de entrega grátis.
  - Alternador segmentado entre *Entrega* e *Retirada no balcão*.
  - Carrossel de upsell com sugestões de acompanhamento.
  - Notificações com botão `[Desfazer]` via `sonner`.
- **💳 Checkout Simulado com WhatsApp**:
  - Passo a passo: Identificação ➔ Endereço em BH ➔ Forma de Pagamento (Cartão na entrega, Pix, Dinheiro).
  - Redirecionamento formatado diretamente para o WhatsApp da pastelaria.
- **🎉 Pedido Enviado ("Pedido na Mão!")**:
  - Efeito comemorativo de confetes (`canvas-confetti`).
  - Stepper de status do pedido em tempo real.
- **🌓 Dark Mode & Light Mode**: Alternância sem flash branco com paleta fiel à tela 06 do Figma via `next-themes`.
- **🌐 Internacionalização (i18n)**: Dicionário completo com alternância instantânea entre Português (PT-BR) e Inglês (EN).

---

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Drawers & Bottom Sheets**: [Vaul](https://vaul.emilkowal.ski/)
- **Toasts**: [Sonner](https://sonner.emilkowal.ski/)
- **Estado Global**: [Zustand](https://zustand.docs.pmnd.rs/) (com `persist` no `localStorage`)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Tipografia**: `Bricolage Grotesque`, `Fraunces`, `DM Sans` via `next/font/google`

---

## 💻 Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/BGLuis/apenas-pastel.git
cd apenas-pastel

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📜 Licença

Distribuído sob a licença MIT. Feito com carinho para amantes de pastel de feira! 🥟
