document.addEventListener("keydown", (e) => {
    console.log('aqui');

    if (e.keyCode===39) {
        
        console.log(correr_ativo);

        // caso a variável de intervalo não esteja nula, interrompemos a execução do código
        if (interval!==null && correr_ativo) return false;

        document.querySelector('.personagem').classList.remove('retorno');

        // criamos o intervalo entre as animações
        interval = setInterval(()=>{
            // descobrindo o index do state atual
            let index = correr.indexOf(state);

            correr_ativo = true;
            
            // removendo a class do state atual
            document.querySelector('.personagem').classList.remove(state);

            // se o index for menor que o tamanho total do array, prossegue
            if ((index+1) < correr.length) {
                state = correr[index+1]; // capturando o novo state
                document.querySelector('.personagem').classList.add(state); // adicionando a class do novo state
            }else{
                state = 'correr'; // capturando o novo state
                document.querySelector('.personagem').classList.add(state); // adicionando a class do novo state
            }
        }, 125);
    }
    if (e.keyCode===37) {
        // caso a variável de intervalo não esteja nula, interrompemos a execução do código
        if (interval!==null && correr_ativo) return false;

        document.querySelector('.personagem').classList.add('retorno');

        // criamos o intervalo entre as animações
        interval = setInterval(()=>{
            // descobrindo o index do state atual
            let index = correr.indexOf(state);
            
            // removendo a class do state atual
            document.querySelector('.personagem').classList.remove(state);

            // se o index for menor que o tamanho total do array, prossegue
            if ((index+1) < correr.length) {
                state = correr[index+1]; // capturando o novo state
                document.querySelector('.personagem').classList.add(state); // adicionando a class do novo state
            }else{
                state = 'correr'; // capturando o novo state
                document.querySelector('.personagem').classList.add(state); // adicionando a class do novo state
            }
        }, 125);
    }
});
// salto
document.addEventListener("keyup", (e) => {
    if (e.keyCode===38) {

        // caso a variável de intervalo não esteja nula, interrompemos a execução do código
        if (interval!==null && saltar_ativo) return false;

        clearInterval(interval);
        interval = null;

        // criamos o intervalo entre as animações
        interval = setInterval(()=>{
            
            let index = saltar.indexOf(state);
            if (index===undefined) index = 0;
            
            // se o index for menor que o tamanho total do array, prossegue
            if ((index+1) < saltar.length) {
                // removendo a class do state atual
                document.querySelector('.personagem').classList.remove(state);
                state = saltar[index+1]; // capturando o novo state
                document.querySelector('.personagem').classList.add(state); // adicionando a class do novo state

                bottom+= 30;
                document.querySelector('.personagem').style.bottom = bottom + 'px';
            }
            else{
                if (bottom>0) {
                    bottom-= 30;
                    document.querySelector('.personagem').style.bottom = bottom + 'px';
                }else{
                    document.querySelector('.personagem').classList.remove(state);
                    state = 'parado';
                    document.querySelector('.personagem').classList.add(state);
                    clearInterval(interval);
                    interval = null;
                    saltar_ativo = false;
                }
            }
        }, 60);
    }
});

document.addEventListener("keyup", (e) => {
    if (e.keyCode===39 || e.keyCode===37) {
        correr_ativo = false;
        document.querySelector('.personagem').classList.remove(state);
        state = 'parado';
        document.querySelector('.personagem').classList.add(state);
        clearInterval(interval);
        interval = null;
    }
});