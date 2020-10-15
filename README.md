![](https://img.shields.io/static/v1?label=school&message=platzi&color=green)
![](https://img.shields.io/static/v1?label=course&message=CursoDeJQueryAJavascript&color=green)

# JQuery
- jQuery es una librería de JavaScript que hizo su lanzamiento en el año 2006 con el fin de resolver diferentes problemáticas:
  - Una misma forma de acceder al DOM; `$({selector})`
  - Poder interactuar con datos de un servidor; `$.ajax()`
  - Crear animaciones; `$.animate()`
- El problema con jQuery surgió cuando se empezó a exagerar su uso y darle menor importancia a aprender JavaScript. Esto genero malos hábitos de aprendizaje y hasta en algunos casos no diferenciar jQuery de JavaScript.
- A la par de que algunos se quedaban en jQuery, estaba ocurriendo la revolución de JavaScript trayendo consigo librerías que resolvían problemas específicos.
- Aun con estas nuevas librerías, seguía sin resolverse el problema de hacer que uno aprenda mas JavaScript que librerías o frameworks pues uno igual puede abusar de Vue, React o Angular.
- Por eso en este curso aprenderás a NO depender de ninguna librería, las ventajas de esto son:
  - Reutilizar conocimientos.
  - Poder implementar soluciones sin dependencias.
  - Estar más capacitado para las grandes empresas.

## Variables y Funciones
- En la primera parte de este curso vamos a buscar traer datos de un servicio externo, para ello vamos a utilizar la mezcla de varias combinaciones: Promesas, ajax/fecth y funciones asíncronas. Antes de implementar una Promesa debes saber dos cosas necesarias: Variables y Funciones.
- Dentro de JavaScript tenemos tres formas de declarar una variable las cuales son: var, const y let.
  - var era la forma en que se declaraban las variables hasta ECMAScript 5.
  - const y let es la forma en que se declaran las variables a partir de ECMAScript 6, const sirve para declarar variables que nunca van a ser modificadas y en cambio let son variables que pueden ser modificadas.
- Las funciones son piezas de código que puedes reutilizar y se declaran con la palabra function.

## Tutorial de Ajax en jQuery y Javascript
Una característica muy solicitada en cualquier sitio dinámico es solicitar datos a un servidor, denominado API. Para esto normalmente se utiliza Ajax.

Ajax recibe dos parámetros los cuales son la url de la API y un objeto donde pondrás la configuración que se usara para realizar la petición. En la configuración se añaden dos funciones para manejar cuando la petición se realizo correctamente y cuando falla.

JavaScript internamente cuenta con una función llamada fetch que también realiza peticiones a una API. Al igual que Ajax necesita dos parámetros, una url y una configuración, pero si solo le mandas la url fetch usará una configuración por defecto donde el método HTTP será GET.
fetch te regresa una promesa, esa promesa al resolverse te da los datos de respuesta y tiene un método llamado json que te regresa otra promesa con los datos en formato JSON.

Las promesas resuelven el problema del Callback Hell haciendo que una promesa pueda devolver otra promesa y en lugar de ser anidadas como los callback, estas promesas son encadenadas.

## Selectores

Los selectores nos permites seleccionar un elemento del DOM con el fin de poder manipularlos. 

Por convención, las variables que son elementos del DOM comienzan con una `$`.

**jQuery**

```js
const $home = $(".home") //Elemento con la clase home
const $home = $("#home") //Elemento con el id home
```

**JavaScript**

```js
//Retorna un elemento con el id home
document.getElementById("home")

//Retorna una lista de elementos con la clase home
document.getElementsByClassname("home")

//Retorna una lista de elementos con el tag div
document.getElementsByTagName("div")

//Devuelve el primer elemento que coincida con el query de búsqueda.
document.querySelector("div .home #modal")

//Devuelve todos los elementos que coincidan con el query de búsqueda.
document.querySelectorAll("div .home #modal")
```

## Clases y estilos CSS

**Clases**

```js
//agrega una clase
$element.classList.add("clase");

//remueve una clase
$element.classList.remove("clase");

//intercambia entre agregar y remover una clase
$element.classList.toggle("clase");
```

**Estilos Inline**

```js
$modal.style.animation = "modalOut .8s forwards";
```

## Creación de elementos 

```js
const $loader = document.createElement("img");
```

