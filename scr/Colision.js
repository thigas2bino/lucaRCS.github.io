class HitBoxes {
    constructor(x, y, dx, dy) {
        this.esquerda = x;
        this.direita = x + dx;
        this.topo = y;
        this.baixo = y + dy;
    }

    // Verifica se há colisão com outra caixa
    Collider(caixa1) {
        return !(this.direita < caixa1.esquerda ||
                 this.topo > caixa1.baixo ||
                 this.esquerda > caixa1.direita ||
                 this.baixo < caixa1.topo);
    }

    // Determina o lado da colisão
    Sider(caixa1) {
        if (this.Collider(caixa1)) {
            const distEsquerda = this.direita - caixa1.esquerda;
            const distDireita = caixa1.direita - this.esquerda;
            const distTopo = this.baixo - caixa1.topo;
            const distBaixo = caixa1.baixo - this.topo;

            // Calcula a penetração mínima
            const minDist = Math.min(distBaixo, distDireita, distEsquerda, distTopo);

            if (minDist === distEsquerda) {
                return 'esquerda';
            } else if (minDist === distDireita) {
                return 'direita';
            } else if (minDist === distTopo) {
                return 'topo';
            } else if (minDist === distBaixo) {
                return 'baixo';
            }
        }
        return null; // Retorna null se não houver colisão
    }
}
export {HitBoxes}