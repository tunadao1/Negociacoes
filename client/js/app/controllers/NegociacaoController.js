class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        
        this._inputData = $("#data");
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $("#valor");
        
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView( $("#negociacoesView") ),
            'adiciona','esvazia'
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView( $("#mensagemView") ),
            'texto'
        );

        this._negociacaoService = new NegociacaoService();
    }

    adiciona( event ) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = "Negociação adicionada com sucesso!";

        this._limpaFormulario();
    }

    esvazia() {

        this._listaNegociacoes.esvazia();
    }

    importarNegociacoes() {

        this._listaNegociacoes.esvazia();

        Promise.all([
            this._negociacaoService.obterNegociacoesDaSemana(),
            this._negociacaoService.obterNegociacoesDaSemanaAnterior(),
            this._negociacaoService.obterNegociacoesDaSemanaRetrasada()]
        )
        .then(negociacoes => {

            console.log(negociacoes)
            negociacoes
            .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
            .forEach( negociacao => {

                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = "Negociações importadas com sucesso!"
            });
        })
        .catch(error => this._mensagem.texto = error);
    }

    _criaNegociacao() {

        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}