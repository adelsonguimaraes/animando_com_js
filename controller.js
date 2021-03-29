document.addEventListener("DOMContentLoaded", function(event) {

    const PERSONAGEM = document.querySelector('.personagem');
    let persona = {
        animations: {
            parado: ['parado', 'parado2', 'parado3', 'parado4', 'parado5'],
            correr: ['correr', 'correr2', 'correr3', 'correr4', 'correr5'],
            saltar: ['saltar', 'saltar2', 'saltar3', 'saltar4']
        },
        actions: {
            rested: false,
            move_left: false,
            move_right: false,
            jump: false,
            down: false
        },
        intervals: {
            rested: false,
            move_left: false,
            move_right: false,
            jump: false,
            down: false
        },
        state: 'parado',
        top: 469,
        top_actual: this.top,
        max_jump: 150,
        rested () {
            if (!this.actions.rested) {
                this.actions.rested=true;
                this.intervals.rested = setInterval(()=>{
                    let index = this.animations.parado.indexOf(this.state);
                    index = (index===-1) ? 0 : index+=1;
                    PERSONAGEM.querySelector('.content').classList.remove(this.state);
                    this.state = this.animations.parado[index] || this.animations.parado[0]; // capturando o novo state
                    PERSONAGEM.querySelector('.content').classList.add(this.state);
                }, 700);
            }
        },
        stop_rested () {
            this.actions.rested=false;
            clearInterval(this.intervals.rested);
        },
        move_left () {
            let count = 0;
            if (!this.actions.move_left) {
                this.actions.move_left = true;
                this.stop_move_right();
                this.stop_rested();
                PERSONAGEM.querySelector('.content').classList.add('retorno');
                console.log('mover para a esquerda');
                let left = PERSONAGEM.offsetLeft;
                this.intervals.move_left = setInterval(()=>{
                    PERSONAGEM.style.left= (left-=1) + 'px';
                    
                    if (this.actions.jump) return false;
                    
                    count++;
                    if (count>=25) {
                        count=0;
                        let index = this.animations.correr.indexOf(this.state);
                        index = (index===-1) ? 0 : index+=1;
                        PERSONAGEM.querySelector('.content').classList.remove(this.state);
                        this.state = this.animations.correr[index] || this.animations.correr[0]; // capturando o novo state
                        PERSONAGEM.querySelector('.content').classList.add(this.state);
                    }
                }, 0.0417);
            }
        },
        stop_move_left () {
            if (this.actions.move_left) {
                this.actions.move_left = false;
                clearInterval(this.intervals.move_left);
                PERSONAGEM.querySelector('.content').classList.remove(this.state);
                this.state = 'parado';
                PERSONAGEM.querySelector('.content').classList.add(this.state);
                console.log('parando de mover para a esquerda');
            }
        },
        move_right () {
            let count = 0;
            if (!this.actions.move_right) {
                this.actions.move_right = true;
                PERSONAGEM.querySelector('.content').classList.remove('retorno');
                this.stop_move_left();
                this.stop_rested();
                console.log('mover para a direita');
                let left = PERSONAGEM.offsetLeft;
                this.intervals.move_right = setInterval(()=>{
                    PERSONAGEM.style.left= (left+=1) + 'px';

                    if (this.actions.jump) return false;

                    count++;
                    if (count>=25) {
                        count=0;
                        let index = this.animations.correr.indexOf(this.state);
                        index = (index===-1) ? 0 : index+=1;
                        PERSONAGEM.querySelector('.content').classList.remove(this.state);
                        this.state = this.animations.correr[index] || this.animations.correr[0]; // capturando o novo state
                        PERSONAGEM.querySelector('.content').classList.add(this.state);
                    }
                }, 0.0417);
            }
        },
        stop_move_right () {
            if (this.actions.move_right) {
                this.actions.move_right = false;
                clearInterval(this.intervals.move_right);
                PERSONAGEM.querySelector('.content').classList.remove(this.state);
                this.state = 'parado';
                PERSONAGEM.querySelector('.content').classList.add(this.state);
                console.log('parando de mover para a direita');
            }
        },
        jump () {
            let count = 0;
            if (!this.actions.jump) {
                this.actions.jump = true;
                this.stop_rested();
                console.log('saltando');
                this.top_actual = this.top;
                this.intervals.jump = setInterval(()=>{
                    // lógica que soma 1px ao top até atingir o max_jump
                    // depois decrementa até voltar ao top padrão
                    if (this.top_actual>(this.top-this.max_jump)){
                        this.top_actual-= 1;
                        PERSONAGEM.style.top = this.top_actual + 'px';
                        count++;
                        if (count>=25) {
                            count=0;
                            let index = this.animations.saltar.indexOf(this.state);
                            index = (index===-1) ? 0 : index+=1;
                            if (this.animations.saltar[index]!==undefined) {
                                PERSONAGEM.querySelector('.content').classList.remove(this.state);
                                this.state = this.animations.saltar[index]; // capturando o novo state
                                PERSONAGEM.querySelector('.content').classList.add(this.state);
                            }
                        }
                    }else{
                        clearInterval(this.intervals.jump);
                        this.intervals.jump = false;
                        this.down();
                        console.log('acabou o salto');
                    }
                }, 0.0417); // 1 frame
            }
        },
        down () {
            if (!this.actions.down) {
                this.actions.down=true;
                this.stop_rested();
                console.log('caindo');
                this.intervals.down = setInterval(()=>{
                    if (this.top_actual<this.top) {
                        this.top_actual+= 1;
                        PERSONAGEM.style.top = this.top_actual + 'px';
                    }else{
                        clearInterval(this.intervals.down);
                        this.actions.down=false;
                        this.actions.jump = false;
                        this.intervals.down = false;
                        PERSONAGEM.querySelector('.content').classList.remove(this.state);
                        this.state = 'parado';
                        PERSONAGEM.querySelector('.content').classList.add(this.state);
                        console.log('acabou a queda');
                    }
                });
            }
        }
    };

    persona.rested();


    document.addEventListener('keydown', (e)=>{
        if (e.key==='ArrowLeft') persona.move_left();
        if (e.key==='ArrowRight') persona.move_right();
        if (e.key==='ArrowUp') persona.jump();
    });
    document.addEventListener('keyup', (e)=>{
        if (e.key==='ArrowLeft') persona.stop_move_left();
        if (e.key==='ArrowRight') persona.stop_move_right();
    });

    return false;

    let anim_correr = ['parado', 'correr', 'correr2', 'correr3', 'correr4', 'correr5'];
    let anim_saltar = ['parado', 'saltar', 'saltar2', 'saltar3', 'saltar4'];
    let state = 'parado';
    let correr_ativo = false;
    let saltar_ativo = false;
    let interval_correr = null;
    let interval_saltar = null;
    let solo = 469;
    let top = 469;
    let limit_saltar = -110;
    let controle_ativo = false;
    let plataforma_ativo = null;
    let audio = null;
    // const PERSONAGEM = document.querySelector('.personagem');
    const MUSIC = document.querySelector('.music');

    function playMusic () {
        audio = new Audio('./mega_man_remix.mp3');
        audio.volume = 0.03;
        audio.play();
    }
    function stopMusic() {
        audio.pause();
        audio = null;
    }
    MUSIC.addEventListener('click', ()=>{
        if (audio===null) {
            MUSIC.querySelector('a').classList.add('music_play');
            playMusic();
        } else {
            MUSIC.querySelector('a').classList.remove('music_play');
            stopMusic();
        }
    });

    document.addEventListener('keydown', (e) => {
        
        // se o controle estiver ativo, desativamos o controle por teclado
        if (controle_ativo) return false;

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

    function move_left () {
        if (!actions.move_left) {
            actions.move_left=true;

        }
    }

    function left_right (direction) {
        if (correr_ativo) return false;

        correr_ativo = true;
        interval_correr = setInterval(()=>{

            sobPlataforma();

            let pp = PERSONAGEM.getBoundingClientRect();
            let plp = document.querySelector('.plataforma').getBoundingClientRect();
            // verificando se o megaman colidiu a esquerda da plataforma
            if (pp.right>=plp.left
                && pp.left<=plp.right // verificando se o megaman colidiu a direita
                && pp.top<=plp.top // verifcando se o megaman está acima da plataforma
                && pp.bottom>=plp.bottom) { // verificando se o megaman está abaixo

                // colidiu do lado direito
                if (pp.left>plp.left && direction==='left') return stop_left_right();
                // colidiu do lado esquerdo
                if (pp.left<plp.left && direction==='right') return stop_left_right();
            }

            

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

    function sobPlataforma() {
        let pp = PERSONAGEM.getBoundingClientRect();
        let plataformas = document.querySelectorAll('.plataforma');

        // console.log(plataformas);

        for (let i=0; i<plataformas.length; i++) {
            let plp = plataformas[i].getBoundingClientRect();
            // se o personagem está a 5px ou menos acima da plataforma
            // console.log((plp.top+5).toFixed(2) + ' > ' +pp.bottom.toFixed(2) + ' < ' + plp.top.toFixed(2));
            if (pp.right>=(plp.left)
                && pp.left<=(plp.right)
                && pp.bottom<=(plp.top+50) 
                && pp.bottom>=plp.top) {
                top = (plp.top-PERSONAGEM.offsetHeight);
                PERSONAGEM.style.top = top + 'px';
                plataforma_ativo = plp;
            }
        }

        if (plataforma_ativo!==null) {
            if ((pp.right<plataforma_ativo.left
                || pp.left>plataforma_ativo.right)
                && top<solo
                ) {
                    queda();
                    top = solo;
                    // PERSONAGEM.style.top = top + 'px';
                    plataforma_ativo = null;
            }
        }
    }

    function queda () {
        let t = top;

        if (saltar_ativo) return false;
        saltar_ativo = true;
        stop_left_right();

        interval_saltar = setInterval(()=>{
            if (t<top) {
                t++;
                document.querySelector('.personagem').classList.remove(state);
                state = 'saltar4'; // capturando o novo state
                document.querySelector('.personagem').classList.add(state); // adicionando a class do novo state
                document.querySelector('.personagem').style.top = t + 'px';
            }
            if (t>=top) {
                document.querySelector('.personagem').classList.remove(state);
                state = 'parado';
                document.querySelector('.personagem').classList.add(state);
                clearInterval(interval_saltar);
                interval_saltar = null;
                saltar_ativo = false;
            }
        }, 0.0417);
    }

    function saltar () {
        if (saltar_ativo) return false;
            
        resetAnimation();

        saltar_ativo = true;

        let t = top;
        let count_px = 0;
        let invert = false;
        interval_saltar = setInterval(()=>{

            sobPlataforma();

            // enquando o top do personagem for maior que o limit de salto
            if (t>(top+limit_saltar) && !invert) {
                t--;
                count_px++;
                document.querySelector('.personagem').style.top = t + 'px';

                if (count_px>=20) {
                    let index = anim_saltar.indexOf(state);
                    if (index===undefined) index = 0;
                    if ((index+1) < anim_saltar.length) {
                        // removendo a class do state atual
                        document.querySelector('.personagem').classList.remove(state);
                        state = anim_saltar[index+1]; // capturando o novo state
                        document.querySelector('.personagem').classList.add(state); // adicionando a class do novo state
                    }
                    count_px=0;
                }
            }else{
                t++;
                invert=true;
                document.querySelector('.personagem').style.top = t + 'px';
            }
            if (t>=top) {
                document.querySelector('.personagem').classList.remove(state);
                state = 'parado';
                document.querySelector('.personagem').classList.add(state);
                clearInterval(interval_saltar);
                interval_saltar = null;
                saltar_ativo = false;
            }
        }, 0.0417);
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

    // switch da ativação do controle
    document.querySelector('.controle').addEventListener('click', ()=>{
        if (controle_ativo) document.querySelector('.controle').style.filter = `grayscale(1)`;
        else document.querySelector('.controle').style.filter = `grayscale(0)`;
        controle_ativo = !controle_ativo;
    });

    window.addEventListener("gamepadconnected", function(e) {
        // console.log("Gamepad connected");
        setInterval(()=>{
            // caso o controle não esteja ativo, paramos a execução
            if (!controle_ativo) return false;

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