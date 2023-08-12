const cardapio = [
  {
      codigo: "cafe",
      valor : 3,
      descricao: "Café",
      condicao: undefined
  },
  {
    codigo: "chantily",
    valor : 1.50,
    descricao: "Chantily (extra do Café)",
    condicao: "cafe"
  },
  {
    codigo: "suco",
    valor : 6.20,
    descricao: "Suco Natural",
    condicao: undefined
  },
  {
    codigo: "sanduiche",
    valor : 6.50,
    descricao: "Sanduíche",
    condicao: undefined
  },
  {
    codigo: "queijo",
    valor : 2,
    descricao: "Queijo (extra do Sanduíche)",
    condicao: "sanduiche"
  },
  {
    codigo: "salgado",
    valor : 7.25,
    descricao: "Salgado",
    condicao: undefined
  },
  {
    codigo: "combo1",
    valor : 9.50,
    descricao: "1 Suco e 1 Sanduíche",
    condicao: undefined
  },
  {
    codigo: "combo2",
    valor : 7.50,
    descricao: "1 Café e 1 Sanduíche",
    condicao: undefined
  }
];

const metodosDePagamento = [
  {
    metodo: "dinheiro",
    taxa: 0.95
  },
  {
    metodo: "credito",
    taxa: 1.03
  },
  {
    metodo: "debito",
    taxa: 1
  }
];


export {cardapio, metodosDePagamento};