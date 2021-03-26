document.addEventListener("DOMContentLoaded", function(event) {

    let anim_correr = ['parado', 'correr', 'correr2', 'correr3', 'correr4', 'correr5'];
    let anim_saltar = ['parado', 'saltar', 'saltar2', 'saltar3', 'saltar4'];
    let state = 'parado';
    let correr_ativo = false;
    let saltar_ativo = false;
    let interval_correr = null;
    let interval_saltar = null;
    let bottom = 285;

    document.addEventListener('keydown', (e) => {
        // frente
        if (e.keyCode===39) {
            left_right('right');
        // esquerda
        }else if (e.keyCode===37) {
            left_right('left');
        // cima
        }else if (e.keyCode===38) {
            saltar();
        }
    });

    function left_right (direction) {
        if (correr_ativo) return false;

            correr_ativo = true;
            interval_correr = setInterval(()=>{

                let index = anim_correr.indexOf(state);

                let left = document.querySelector('.personagem').offsetLeft;
                if (direction==='right') {
                    document.querySelector('.personagem').classList.remove('retorno');
                    document.querySelector('.personagem').style.left = (left+20) + 'px';
                }else{
                    document.querySelector('.personagem').classList.add('retorno');
                    document.querySelector('.personagem').style.left = (left-20) + 'px';
                }

                if (saltar_ativo) return false;

                if ((index+1) < anim_correr.length) {
                    document.querySelector('.personagem').classList.remove(state);
                    state = anim_correr[index+1]; // capturando o novo state
                    document.querySelector('.personagem').classList.add(state); // adicionando a class do novo state
                }else{
                    document.querySelector('.personagem').classList.remove(state);
                    state = 'correr'; // capturando o novo state
                    document.querySelector('.personagem').classList.add(state); // adicionando a class do novo state
                }
            }, 80);
    }

    function stop_left_right () {
        correr_ativo = false;
        clearInterval(interval_correr);
        interval_correr=null;
        if (!saltar_ativo) resetAnimation ();
    }

    function saltar () {
        if (saltar_ativo) return false;
            
        resetAnimation();

        saltar_ativo = true;

        interval_saltar = setInterval(()=>{

            let index = anim_saltar.indexOf(state);
            if (index===undefined) index = 0;
            
            // se o index for menor que o tamanho total do array, prossegue
            if ((index+1) < anim_saltar.length) {
                // removendo a class do state atual
                document.querySelector('.personagem').classList.remove(state);
                state = anim_saltar[index+1]; // capturando o novo state
                document.querySelector('.personagem').classList.add(state); // adicionando a class do novo state

                bottom+= 50;
                document.querySelector('.personagem').style.bottom = bottom + 'px';
            }
            else{
                if (bottom>285) {
                    bottom-= 50;
                    document.querySelector('.personagem').style.bottom = bottom + 'px';
                }else{
                    document.querySelector('.personagem').classList.remove(state);
                    state = 'parado';
                    document.querySelector('.personagem').classList.add(state);
                    clearInterval(interval_saltar);
                    interval_saltar = null;
                    saltar_ativo = false;
                }
            }
        }, 75);
    }

    document.addEventListener("keyup", (e) => {
        if (e.keyCode===39 || e.keyCode===37) {
            stop_left_right();
        }
    });

    function resetAnimation () {
        document.querySelector('.personagem').classList.remove(state);
        state = 'parado'; // capturando o novo state
        document.querySelector('.personagem').classList.add(state); // adicionando a class do novo state
    }

    window.addEventListener("gamepadconnected", function(e) {
        console.log("Gamepad connected");
        setInterval(()=>{
            let gamepads = navigator.getGamepads();
            // for (let i=0; i<gamepads.length; i++) {
                // if (gamepads[i]!==null) {
                let i = 0;
                if (gamepads[i]!==null) {
                    // console.log(gamepads[i]);
                    // butoes de acao
                    if (gamepads[i].buttons[2].touched) {
                        saltar();
                    }
                    if (gamepads[i].axes[0]==-1) {
                        left_right('left');
                    }
                    if (gamepads[i].axes[0]==1) {
                        left_right('right');
                    }
                    if (gamepads[i].axes[0]==-0.003921568393707275) {
                        stop_left_right();
                    }
                }
            // };
        }, 50);
    });

});