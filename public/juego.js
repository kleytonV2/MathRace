
		var segundos = 0;
        var minutos = 0;
        var segundosDesbloqueoP = 0; //Tiempo requerido para desbloquear personajes
        var minutosDesbloqueoP = 0;
        var contCuentaAtras = 3;
		var contPartidas = 0;
        var listaTiempos = [];
        var valorRespuesta = 0 //Se origina en calculo();
        var contTB = 0;//contador de TextoBloqueo, lo utilizo para animar



		function moverPersonaje(tecla){

            var teclaPulsada = tecla.keyCode;

			if (teclaPulsada == 13) {
               document.querySelector("#operacion").style.color = "white";
                
                if(document.querySelector("input").value==valorRespuesta){
                    sonidoCorrecto();
                    personajeAdelante();
                    calculo();
                    document.querySelector("input").value="";

                }else{
                    sonidoErroneo();
                    document.querySelector("#operacion").style.color = "red";
                    document.querySelector("input").value="";
                }
			}
//			else if (teclaPulsada == 37){
//				personajeAtras();
//			}


		}

        function tiempo(){

            posicionMeta = document.getElementById("meta").getBoundingClientRect().left;
            posicionPersonaje = document.getElementById("personaje").getBoundingClientRect().left;

            segundos=(segundos+1)%60;
            segundosDesbloqueoP++;
            if(segundos<10){
			document.getElementById("segundos").innerHTML = "0"+segundos;
            }else{
            document.getElementById("segundos").innerHTML = segundos%60;
            }

            if(segundos==0){
			minutos=(minutos+1)%60;
            minutosDesbloqueoP++;
                if(minutos<10){
			         document.getElementById("minutos").innerHTML = "0"+minutos;
			     }
                else{
                    document.getElementById("minutos").innerHTML = minutos;
                }
            }
            if((posicionPersonaje+60) >= (posicionMeta)) {
                llegadaMeta();
            }
		}

        function seleccionPersonajeHecha(){
            document.getElementById("seleccionPersonajes").style.display = "none";
            var padre = document.getElementById("pantallaInicio");
            var elemento = document.createElement("p");
            padre.append(elemento);
            pararCuentaAtras = setInterval(cuentaAtras,1000);
        }

        function cuentaAtras(){

            var padre = document.getElementById("pantallaInicio");
            var elemento = document.querySelector("#pantallaInicio p");
            elemento.innerHTML = contCuentaAtras;
            padreInput = document.querySelector("#respuestaCalculo");
            inputRespuesta = document.createElement("input");

            if(contPartidas==0){ //contPartidas=cantidad de partidas jugadas;

                if(contCuentaAtras<=0){
                calculo();
                sonidoJuego();
                document.getElementById("operacion").style.display = "inline-block";
                inputRespuesta.setAttribute("autofocus","autofocus");
                padreInput.append(inputRespuesta);
                document.addEventListener("click",activarInput);
                clearInterval(pararCuentaAtras); //Se encuentra en quitarpantallaInicio();

                document.onkeyup = moverPersonaje;
//                document.addEventListener("touchstart", moverPersonajeMovil);
                document.getElementById("pantallaInicio").style.display = "none";
                tiempoInicioPartida = setInterval(tiempo,1000);
                contCuentaAtras = 3;
                padre.removeChild(elemento);
                activarInput();
                }else{
                    contCuentaAtras--;
                }
            }else{
                if(contCuentaAtras<=0){
                calculo();
                document.getElementById("audioJuego").play();
                document.getElementById("operacion").style.display = "inline-block";
                inputRespuesta.setAttribute("autofocus","autofocus");
                padreInput.append(inputRespuesta);
                document.addEventListener("click",activarInput);
                clearInterval(pararCuentaAtras); //Se encuentra en quitarpantallaInicio();
                document.onkeyup = moverPersonaje;
//                document.addEventListener("touchstart", moverPersonajeMovil);
                document.getElementById("pantallaInicio").style.display = "none";
                tiempoInicioPartida = setInterval(tiempo,1000);
                contCuentaAtras = 3;
                padre.removeChild(elemento);
                activarInput();
                }else{
                    contCuentaAtras--;
                }
            }

        }

		function personajeAdelante(){
            var elem = document.getElementById("personaje");
			var margen = elem.getBoundingClientRect().left;
			margen += 130;
			elem.style.marginLeft = margen.toString()+"px";

		}

		function personajeAtras(){
			var elem = document.getElementById("personaje");
			var margen = elem.getBoundingClientRect().left;
			if(margen>2){
            margen += -15;
			elem.style.marginLeft = margen.toString()+"px";
		  }
        }

		function cambiarPersonaje(valor){

 			if (valor == 1) {
 				document.getElementById("personaje").style.backgroundImage = "url('personaje1.gif')";
 			}
 			else if(valor == 2){
 				document.getElementById("personaje").style.backgroundImage = "url('personaje2.gif')";
 			}
 			else if(valor == 3){
 				document.getElementById("personaje").style.backgroundImage = "url('personaje3.gif')";
 			}
 			else{
 				document.getElementById("personaje").style.backgroundImage = "url('personaje4.gif')";
 			}
		}

        function llegadaMeta(){
            padreInput.removeChild(inputRespuesta);
            document.removeEventListener("click",activarInput);
            clearInterval(tiempoInicioPartida); //Se encuenttra en cuentaAtras, es el inicio del cronometro al comienzo .
            clearInterval(pararCuentaAtras); //Paro la cuenta atras de la funcion cuentaAtras() que se ejecuta cada vez que se llega a meta.
            ventanaAlertaLlegadaMeta();
        }

        function reiniciarJuego(){
            //document.onkeyup = null;
            //document.removeEventListener("touchstart", moverPersonajeMovil);
            document.getElementById("ventanaMeta").remove();
            document.getElementById("operacion").style.display = "none";

            escribirTiempoRecord();

            contPartidas++;
            minutos=0;
            segundos=0;


            document.getElementById("minutos").innerHTML = "00";
            document.getElementById("segundos").innerHTML = "000";


            document.getElementById("personaje").style.marginLeft = "8px";

            mostraSeleccionPersonajes();

            if(contPartidas>0){desbloquearPersonaje()};

            segundosDesbloqueoP=0; //Tiempo para desbloquear personajes
            minutosDesbloqueoP=0;
            document.getElementById("audioJuego").pause();
            document.getElementById("audioPersonajes").play();
        }

        function ventanaAlertaLlegadaMeta(){

            var caja = document.createElement("div");
            var parrafo = document.createElement("p");
            var texto = "";
            var boton = document.createElement("button");


            boton.style.width = "100px";
            boton.style.height = "50px";
            boton.style.borderRadius = "10px";
            boton.addEventListener("click",reiniciarJuego);
            boton.innerHTML = "presióname!!";

            caja.style.width = "40%";
            caja.style.height = "20%";
            caja.style.textAlign = "center";
            caja.style.position = "relative";
            caja.style.margin = "200px auto";
            caja.style.border = "2px solid red";
            caja.style.borderRadius = "10px";
            caja.style.backgroundColor = "white";
            caja.setAttribute("id","ventanaMeta");

            if(segundos<10){
                    if(minutos<10){
                        listaTiempos[contPartidas] = "0"+minutos+":"+"0"+segundos;
                        texto = "HAS LLEGADO A LA META!!!\n"+"has tardado "+minutos+" minutos y "+"0"+segundos+" segundos en llegar a la meta!";
                    }else{
                        listaTiempos[contPartidas] = minutos+":"+"0"+segundos;
                        texto = "HAS LLEGADO A LA META!!!\n"+"has tardado "+minutos+" minutos y "+"0"+segundos+" segundos en llegar a la meta!";
                    }
                }else{
                    if(minutos<10){
                        listaTiempos[contPartidas] = "0"+minutos+":"+segundos;
                        texto = "HAS LLEGADO A LA META!!!\n"+"has tardado "+minutos+" minutos y "+segundos+" segundos en llegar a la meta!";
                    }else{
                        listaTiempos[contPartidas] = minutos+":"+segundos;
                        texto = "HAS LLEGADO A LA META!!!\n"+"has tardado "+minutos+" minutos y "+segundos+" segundos en llegar a la meta!";
                    }
                }


            parrafo.innerHTML = texto;
            caja.appendChild(parrafo);
            caja.appendChild(boton);
            document.getElementById("pantallaInicio").appendChild(caja);
            document.getElementById("pantallaInicio").style.display = "block";

        }

        function escribirTiempoRecord(){

            listaTiempos.sort();
            document.getElementById("listaUno").innerHTML = listaTiempos[0];
            if(contPartidas>0){
                document.getElementById("listaDos").innerHTML = listaTiempos[1];
            }else{
               document.getElementById("listaDos").innerHTML = "PIKACHU - 06:000";
            }

            if(contPartidas>1){
                    document.getElementById("listaTres").innerHTML = listaTiempos[2];
            }else{
                document.getElementById("listaTres").innerHTML = "MARIO - 08:000";
            }

            if(contPartidas>2){
                document.getElementById("listaCuatro").innerHTML = listaTiempos[3];
            }else{
                document.getElementById("listaCuatro").innerHTML = "BMO - 20:000";
            }
        }

        function desbloquearPersonaje(){

            if(minutosDesbloqueoP<2){
                document.getElementById("candado1").style.display = "none";
            }
            if(minutosDesbloqueoP<1){
                document.getElementById("candado2").style.display = "none";
            }
            if(segundosDesbloqueoP<30){
                document.getElementById("candado3").style.display = "none";
            }
        }

        function personajeBloqueado(){
            //textoBloqueo()//mensaje emergente que indica que un personaje se encuentra bloqueado
//            window.alert("Este personaje está bloqueado");
            var elemento = document.querySelector("#textoBloqueo");

            if(elemento.style.display=="none"){
               elemento.style.display="block";
            }else{
                elemento.style.display="none"
            }
        }

        function mostraSeleccionPersonajes(){
            if(contPartidas==0){
                var padre = document.getElementById("pantallaInicio");
                var menu = document.getElementById("menu");
                padre.removeChild(menu);
            }
            document.getElementById("seleccionPersonajes").style.display = "block";
        }

        function calculo(){

            var mover = false;
            var signos = ["+","-"];
            var signoEscogido = signos[Math.floor(Math.random()*2)];

            do{
                var numeroAleatorio1 = Math.floor((Math.random() * 10) + 1);
                var numeroAleatorio2 = Math.floor((Math.random() * 10) + 1);
            }while(numeroAleatorio1<numeroAleatorio2);//Evito resultados negativos

            var numero1 = numeroAleatorio1;
            var numero2 = numeroAleatorio2;

            var operacion = numeroAleatorio1+signoEscogido+numeroAleatorio2;


            document.getElementById("operacion").innerHTML =  "<p>"+operacion+"</p>";

            valorRespuesta = eval(operacion);

        }

        function activarInput(){
            document.querySelector("input").focus();
        }


//******** SONIDO **************


        window.onload=function(){
            var audio = document.createElement("audio");
            var source = document.createElement("source");

            audio.appendChild(source);
            source.setAttribute("src","intro.mp3");
            source.setAttribute("type","audio/mpeg");
            document.body.appendChild(audio);
            audio.setAttribute("id","audioIntro");
            audio.setAttribute("autoplay","autoplay");
            audio.setAttribute("loop","loop");
        }

        var contadorPersonajes = -1;
        var contadorJuego = -1;
        var contadorCorrectas = -1;//se encuentra en sonidoCorrrecto(audio de respuesta correcta).
        var contadorErroneas = -1;

        function sonidoEmpezar(){
            document.getElementById("audioIntro").remove();

            var audio = document.createElement("audio");
            var source = document.createElement("source");

            audio.appendChild(source);
            source.setAttribute("src","empezar.mp3");
            source.setAttribute("type","audio/mpeg");
            document.body.appendChild(audio);
            audio.setAttribute("id","audioEmpezar");
            audio.setAttribute("autoplay","autoplay");
        }

        function sonidoSeleccionPersonajes(){
            contadorPersonajes++;
            if(contadorPersonajes==0){
            var audio = document.createElement("audio");
            var source = document.createElement("source");

            audio.appendChild(source);
            source.setAttribute("src","seleccionPersonajes.mp3");
            source.setAttribute("type","audio/mpeg");
            document.body.appendChild(audio);
            audio.setAttribute("id","audioPersonajes");
            audio.setAttribute("autoplay","autoplay");
            audio.setAttribute("loop","loop");
            }
        }

        function sonidoPersonajeElegido(){
            document.getElementById("audioEmpezar").play();
            document.getElementById("audioPersonajes").pause();
        }

        function sonidoJuego(){
                contadorJuego++;
            if(contadorJuego==0){
                var audio = document.createElement("audio");
                var source = document.createElement("source");

                audio.appendChild(source);
                source.setAttribute("src","juego.ogg");
                source.setAttribute("type","audio/ogg");
                document.body.appendChild(audio);
                audio.setAttribute("id","audioJuego");
                audio.setAttribute("autoplay","autoplay");
                audio.setAttribute("loop","loop");
            }
        }

        function sonidoCorrecto(){
                contadorCorrectas++;

                if(contadorCorrectas==0){
                var audio = document.createElement("audio");
                var source = document.createElement("source");

                audio.appendChild(source);
                source.setAttribute("src","correct.mp3");
                source.setAttribute("type","audio/mpeg");
                document.body.appendChild(audio);
                audio.setAttribute("id","audioCorrecto");
                audio.setAttribute("autoplay","autoplay");
                }else{
                    document.getElementById("audioCorrecto").play();
                }

        }

        function sonidoErroneo(){
                contadorErroneas++;

                if(contadorErroneas==0){
                var audio = document.createElement("audio");
                var source = document.createElement("source");

                audio.appendChild(source);
                source.setAttribute("src","wrong.mp3");
                source.setAttribute("type","audio/mpeg");
                document.body.appendChild(audio);
                audio.setAttribute("id","audioErroneo");
                audio.setAttribute("autoplay","autoplay");
                }else{
                    document.getElementById("audioErroneo").play();
                }

        }
