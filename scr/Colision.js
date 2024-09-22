class HitBoxes {
    constructor(x, y, dx, dy,room,num) {
        this.esquerda = x;
        this.direita = x + dx;
        this.topo = y;
        this.baixo = y + dy;
        this.room = room
        this.num = num
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
        const distancias = {
            esquerda: this.direita - caixa1.esquerda,
            direita: caixa1.direita - this.esquerda,
            topo: this.baixo - caixa1.topo,
            baixo: caixa1.baixo - this.topo
        };
        
        return Object.keys(distancias).reduce((prev, curr) => 
            distancias[curr] < distancias[prev] ? curr : prev
        );
    }
    return null; // Retorna null se não houver colisão
}
}
export {HitBoxes}