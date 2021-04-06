
window.onload = function(){ //Acciones tras cargar la página
    pantalla=document.getElementById("textoPantalla"); //elemento pantalla de salida
    anterior=document.getElementById("textoAnterior"); //elemento pantalla de salida
    ocultar("estandar");
  }
  x="0"; //número en pantalla
  xi=1; //iniciar número en pantalla: 1=si; 0=no;
  iniciar_num = true;
  coma=0; //estado coma decimal 0=no, 1=si;
  rad =  false;
  ni=0; //número oculto o en espera.
  op="no"; //operación en curso; "no" =  sin operación.
  
  function binario(){
    if(x>0){
        var aux = x;
        var resultado = "";
        while (aux > 0){
          resultado = resultado + parseInt(aux%2);
          aux = parseInt(aux/2);
        }
        mostrar(resultado);
    }
  }
  
  function octal(){
    if(x>0){
        var aux = x;
        var resultado = "";
        while (aux > 0){
          resultado = resultado + parseInt(aux%8);
          aux = parseInt(aux/8);
        }
        mostrar(resultado);
    }
  }
  
  function hexadecimal(numero){
    if(x>0){
      var aux = x;
      var resultado = "";
      var residuo = 0;
      while (aux > 0){
        residuo = parseInt(aux%16);
        if(residuo>9)
          residuo = abc(residuo);
        resultado = resultado + residuo;
        aux = parseInt(aux/16);
      }
      mostrar(resultado);
    }
  }
  
  function abc(residuo){
    switch (residuo){
      case 10: return "A";
      break;
      case 11: return "B";
      break;
      case 12: return "C";
      break;
      case 13: return "D";
      break;
      case 14: return "E";
      break;
      case 15: return "F";
      break;
    }
  }
  
  function mostrar(resultado){
    var aux = "";
    var i=resultado.length-1;
    while(i>=0){
      aux = aux + resultado[i];
      i--;
    }
    ni=x;  
    iniciar_num=true;
    anterior.innerHTML=x;
    pantalla.innerHTML=aux;
  }
  
  //mostrar número en pantalla según se va escribiendo:
  function numero(xx) { //recoge el número pulsado en el argumento.
    if (op=="no")
      anterior.innerHTML=""; //Detallito
    if (x=="0" || iniciar_num) {	// inicializar un número, 
      pantalla.innerHTML=xx; //mostrar en pantalla
      x=xx; //guardar número
      if (xx==".") { //si escribimos una coma al principio del número
         pantalla.innerHTML="0."; //escribimos 0.
         x=xx; //guardar número
         coma=1; //cambiar estado de la coma
         }
     }
     else { //continuar escribiendo un número
         if (xx=="." && coma==0) { //si escribimos una coma decimal pòr primera vez
             pantalla.innerHTML+=xx;
             x+=xx;
             coma=1; //cambiar el estado de la coma  
         }
         //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
         else if (xx=="." && coma==1) {
             pantalla.innerHTML+=xx;
             x+=xx;
             coma=0;
         } 
         //Resto de casos: escribir un número del 0 al 9:
         else{
             pantalla.innerHTML+=xx;
             x+=xx;
         }
      }
    iniciar_num=false; //el número está iniciado y podemos ampliarlo.
  }
  
  function operar(s) {
    if(document.getElementById("cientifica").style.display == "block" && s!="^"){
      iniciar_num=false;
      op="si";
      numero(s);
    }
    else{
      igualar() //si hay operaciones pendientes se realizan primero
      ni=x //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
      op=s; //guardamos tipo de operación.
      anterior.innerHTML= x+" "+s+" ";
      iniciar_num=true; //inicializar pantalla. xi
    }
  }
  
  function igualar() {
    if (op=="no") { //no hay ninguna operación pendiente.
      pantalla.innerHTML=x; //mostramos el mismo número 
    }
    else if (op=="si"){
      sol=eval(x);
      anterior.innerHTML=x;
      pantalla.innerHTML=sol; 
      //mostramos la solución
      x=sol; 
      //guardamos la solución
   
      op="no"; //ya no hay operaciones pendientes
      iniciar_num=true; //se puede reiniciar la pantalla.
    }
    else { //con operación pendiente resolvemos
      sl=ni+op+x; // escribimos la operación en una cadena
      anterior.innerHTML+=x;
      if(op=='^') {
        sol = Math.pow(ni,x);
        pantalla.innerHTML= sol;
        x = sol;
      }
      else{
        sol=eval(sl) //convertimos la cadena a código y resolvemos
        pantalla.innerHTML=sol; //mostramos la solución
        x=sol; //guardamos la solución
      }
      op="no"; //ya no hay operaciones pendientes
      iniciar_num=true; //se puede reiniciar la pantalla.
    }
  }
  
  function especial(xx){
    if (x=="0" || iniciar_num) {
      if(xx=="pi"){
        pantalla.innerHTML=Math.PI;
        x=Math.PI;
      }
      else if(xx=="e"){
        pantalla.innerHTML=Math.E;
        x=Math.E;
      }
    }
    else{
      if(xx=="pi"){
        pantalla.innerHTML+=Math.PI;
        x+=Math.PI;
      }
      else if(xx=="e"){
        pantalla.innerHTML+=Math.E;
        x+=Math.E;
      } 
    }
    iniciar_num=true;
  }
  
  function radian(){
    var sty = document.getElementById("radiante");
    if(!rad) {
      sty.style.backgroundColor = "#99BBEE";
      sty.style.color = "#DFDFDF";
      rad = true;
    }
    else{
      sty.style.backgroundColor = "#EFEFEF";
      sty.style.color = "#2f4eab";
      rad = false; 
    }
  
  }
  
  function trigo(xx){
    anterior.innerHTML = xx + " " + x;
    if(rad)
      x = x*(Math.PI/180);      
    iniciar_num=true;
    var trig;
    switch(xx){
      case 'sen': trig=Math.sin(x);
      break;
      case 'cos': trig=Math.cos(x);
      break;
      case 'tan': trig=Math.tan(x);
      break;
      case 'arc sen': trig=Math.asin(x);
      break;
      case 'arc cos': trig=Math.acos(x);
      break;
      case 'arc tan': trig=Math.atan(x);
      break;
    }
    x = trig;
    if (Math.abs(1-x) < 0.09 || Math.abs(0-x) < 0.09){
      trig=Math.round(x);
    }
    if (Math.abs(0.5-x) < 0.09){
      trig=x.toFixed(1);
    }
    
    pantalla.innerHTML = trig;
  }
  
  function absoluto() {
    iniciar_num=true;
    if(x<0)
      x *= -1;
    return x;
  }
  
  function factorial() {
    iniciar_num=true;
    var total = 1; 
    for (i=1; i<=x; i++) {
      total = total * i; 
    }
    anterior.innerHTML = x + "!";
    pantalla.innerHTML = total;
  }
  
  function logaritmo(base) {
    if(base=='10') {
      anterior.innerHTML="log "+x;
      x = Math.log10(x);
    }
    else {
      anterior.innerHTML="ln "+x;
      x = Math.log(x);
    }
    pantalla.innerHTML=x;
    iniciar_num=true;
  }
  
  function raizc() {
    anterior.innerHTML="√"+x;
    x=Math.sqrt(x) //resolver raíz cuadrada.
    pantalla.innerHTML=x; //mostrar en pantalla resultado
    op="no"; //quitar operaciones pendientes.
    iniciar_num=true; //se puede reiniciar la pantalla 
  }
  
  function porcent() { 
    x=x/100 //dividir por 100 el número
    pantalla.innerHTML=x; //mostrar en pantalla
    igualar() //resolver y mostrar operaciones pendientes
    iniciar_num=true //reiniciar la pantalla
  }
  
  function opuest() { 
    nx=Number(x); //convertir en número
    nx=-nx; //cambiar de signo
    x=String(nx); //volver a convertir a cadena
    pantalla.innerHTML=x; //mostrar en pantalla.
  }
  
  function inve() {
    nx=Number(x);
    nx=(1/nx);
    anterior.innerHTML="1/"+x;
    x=String(nx);
    pantalla.innerHTML=x;
    iniciar_num=true; //reiniciar pantalla al pulsar otro número.
  }
  
  function retro(){ //Borrar sólo el último número escrito.
    cifras=x.length; //hayar número de caracteres en pantalla
    br=x.substr(cifras-1,cifras) //describir último caracter
    x=x.substr(0,cifras-1) //quitar el ultimo caracter
    if (x=="") {x="0";} //si ya no quedan caracteres, pondremos el 0
    if (br==".") {coma=0;} //Si el caracter quitado es la coma, se permite escribirla de nuevo.
    pantalla.innerHTML=x; //mostrar resultado en pantalla	 
  }
  
  function borradoParcial() {
    pantalla.innerHTML=0; //Borrado de pantalla;
    x=0; //Borrado indicador número pantalla.
    coma=0;	//reiniciamos también la coma				
  }
  
  function borradoTotal() {
    pantalla.innerHTML=0; //poner pantalla a 0
    anterior.innerHTML="";
    x="0"; //reiniciar número en pantalla
    coma=0; //reiniciar estado coma decimal 
    ni=0 //indicador de número oculto a 0;
    op="no" //borrar operación en curso.
  }
