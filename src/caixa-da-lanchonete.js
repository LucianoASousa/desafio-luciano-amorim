import { cardapio, metodosDePagamento } from './utils.js' ;

class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        const metodoDePagamentoValido = this.verificarMetodoDePagamento(metodoDePagamento);
        if (!metodoDePagamentoValido.status) {
            return metodoDePagamentoValido.mensagem;
        }

        itens = this.formatarItens(itens);
        const itensValidos = this.verificarItens(itens);
        if (!itensValidos.status) {
            return itensValidos.mensagem;
        }

        const valorTotal = this.calcularTotal(itens);
        const valorTotalFormatado = this.valorArredondadoETaxadoEFormatado(valorTotal, metodoDePagamentoValido);
        
        return valorTotalFormatado
    }

    calcularTotal(itens) {
        return itens.reduce((total, item) => {
            const itemCardapio = cardapio.find(cardapioItem => cardapioItem.codigo === item.nome);
            return total + itemCardapio.valor * item.quantidade;
        }, 0);
    }

    valorArredondadoETaxadoEFormatado(valor, metodoDePagamento) {

        const valorTaxado = valor * metodoDePagamento.taxa;
        const valorArredondado = valorTaxado.toFixed(2)
        const valorFormatado = Number(valorArredondado).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

        return valorFormatado;
    }

    verificarItens(itens) {
        let resultado = {
            status: true,
            mensagem: '',
        }

        if (itens.length < 1) {
            resultado = {
                status: false,
                mensagem: 'Não há itens no carrinho de compra!',
            }
        }

        itens.forEach(item => {

            const itemCardapio = cardapio.find(cardapio => cardapio.codigo === item.nome);
            if (!itemCardapio) {
                resultado = {
                    status: false,
                    mensagem: 'Item inválido!',
                }
                return
            }

            if (item.quantidade < 1) {
                resultado = {
                    status: false,
                    mensagem: 'Quantidade inválida!',
                }
                return
            }

            if (itemCardapio.condicao && !itens.some(item => item.nome === itemCardapio.condicao)) {
                resultado = {
                    status: false,
                    mensagem: 'Item extra não pode ser pedido sem o principal',
                }
                return
            }
        })

        return resultado
    }

    verificarMetodoDePagamento(metodoDePagamento) {
        
        const metodoDePagamentoSelecionado = metodosDePagamento.find(metodo => metodo.metodo === metodoDePagamento);
        if (!metodoDePagamentoSelecionado) {
            return {
                status: false,
                mensagem: 'Forma de pagamento inválida!',
                taxa: 0,
            }
        }
    
        return {
            status: true,
            mensagem: '',
            taxa: metodoDePagamentoSelecionado.taxa,
        }
    }

    formatarItens(itens) {
        itens = itens.map(item => {
            const [nome, quantidade] = item.split(',')
            return {
                nome,
                quantidade: Number(quantidade),
            }
        })
        return itens;
    }
}

export { CaixaDaLanchonete };