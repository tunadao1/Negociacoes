class NegociacoesView  extends View {

    constructor( elemento ) {

        super(elemento);
    }

    template( model ) {

        return `
                <table class="table table-hover table-bordered table-responsive">
                    <thead>
                        <tr>
                            <th>DATA</th>
                            <th>QUANTIDADE</th>
                            <th>VALOR</th>
                            <th>VOLUME</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        ${ model.negociacoes.map(negociacao => `

                            <tr>
                                <td>${ DataHelper.dataParaTexto( negociacao.data ) }</td>
                                <td>${ negociacao.quantidade }</td>
                                <td>${ negociacao.valor }</td>
                                <td>${ negociacao.volume }</td>
                            <tr>

                        `).join('')}
                    </tbody>
                    
                    <tfoot>
                        <tr>
                            <td colspan="3"></td>
                            <td>${ model.negociacoes.reduce((total, item) => total += item.volume, 0) }</td>
                        </tr>
                    </tfoot>
                </table>
        `
    }
}