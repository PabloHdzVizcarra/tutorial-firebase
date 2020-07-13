import { db } from './firebase/config';
import { mostrarDocumentos } from './helpers/mostrarDocumentos';

const usuario = {
  nombre: 'Margarita Klein',
  activo: false,
  fechaNaci: 0
}


// creamos la referencia a la coleccion de firebase con el nombre usuarios
const usuariosRef = db.collection('usuarios');



// -------------------------INSERSION DE DATOS EN FIRESTORE ------------------
// agregamos el metodo collection a la db creada en firestore, para empezar a agregar datos al db


db.collection('usuarios')
  .add(usuario)
  .then((docRef) => {
    console.log(docRef);
  })
  .catch((error) => console.log(error))


// -------------------------UPDATE/ACTUALIZAR DATOS DE UN DOCUMENTO EN FIRESTORE --------------------------

// para poder hacer update de datos tienes que pasar el id del documento a modificar


db.collection('usuarios')
  .doc('Yufr1xYsUJkqrGjpWAOy')
  .update({
    activo: false
  })


// -------------------------- MODIFICAR EL DOCUMENTO CON DATOS NUEVOS--------------------------------------

// el metodo SET elimina todos los datos antiguos de la collecion y agregar solo los datos pasados como argumentos
const setData = () => {

  db.collection('usuarios')
    .doc('Yufr1xYsUJkqrGjpWAOy')
    .set({
      activo: true,
      edad: 35,
    })
}


// --------------------------ELIMINAR POR COMPLETO UN DOCUMENTO --------------------------------

const deleteData = () => {
  
  // el metodo DELETE elimina todo el documento 
  db.collection('usuarios')
    .doc('U01SlFSlDBu44EMCvWV2')
    .delete()
    .then((resp) => console.log('Eliminado'))
    .catch((error) => console.log(error))
}

// ----------------OBTENER TODOS LOS DOCUMENTOS DE UNA COLECCION---------------------


// se crea un Snap de la coleccion usuarios con todos sus documentos
// el metodo forEach recorre todos los documentos de esa coleccion
// cada documento tiene un metodo DATA con el cual traemos su informacion
// para unir la data con el respectivo id del documento usamos un array vacio
// este metodo es un OBSERVLE estara observando todas las modificaciones a todos
// los documentos de la coleccion y automaticamente se volvera a llamar si 
// dichos documentos se modifican es com un useEffect en React


db.collection('usuarios')
  .onSnapshot((snap) => {
    const usuarios: any[] = [];

    snap.forEach((snapChild) => {

      usuarios.push({
        id: snapChild.id,
        ...snapChild.data()
      });
    })

    console.log(usuarios);
  })




// ------------OPTIMIZANDO EL CODIGO PARA TRAER TODOS LOS DOCUMENTOS DE LA COLECCION ----------------


// se crear un helper y se importa la funcion desde un archivo externo para simplificar el codigo


db.collection('usuarios')
  .onSnapshot((snap) => {

    mostrarDocumentos(snap);

  });


// se simplifica el codigo de arriba, en javascript cuando tienes un fucion que retorna un valor y ese mismo
// valor se pasara a otra funcion como primer argumento, lo puedes pasar automaticamente solo con 
// poner la referencia a la funcion



db.collection('usuarios')
  .onSnapshot(mostrarDocumentos);




// ----------TRAER TODOS LOS DATOS DE LA COLECCION CON EL METODO  get----------------------------
// con este metodo se traen todos los documentos de la coleccion, solo que este metodo no es observle
// no se actualizara su llamado cada vez que se modifique algun documento
// este metodo retorna una promesa

db.collection('usuarios').get().then(mostrarDocumentos);


//-----------METODO WHERE PARA FILTRAR LOS RESULTADOS EN BASE A LAS CONDICIONES PROPORCIONADAS-------

// el metodo where filtra los resultados con las condiciones dadas
// el primer parametro que se proporciona es el nombre de la propieadad
// el segundo es la operacion a evaluar
// el tercero es el valor

db.collection('usuarios').where('activo', '==', true).get().then(mostrarDocumentos);
db.collection('usuarios').where('salario', '>', 1800).get().then(mostrarDocumentos);


db.collection('usuarios')
  .where('salario', '>', 1800)
  .where('salario', '<', 2100)
  .get()
  .then(mostrarDocumentos);
  
  
db.collection('usuarios')
  .where('salario', '>', 1800)
  .where('activo', '==', true)
  .get()
  .then(mostrarDocumentos);




//-----METODO ORDER BY PARA ORDENAR LOS DOCUMENTOS DE LA COLECCION-------------------
// con este metodo se pueden ordenar los campos de los documentos

db.collection('usuarios')
  .orderBy('nombre')
  .get()
  .then(mostrarDocumentos)

db.collection('usuarios')
  .orderBy('salario')
  .get()
  .then(mostrarDocumentos)

// para ordener de manera ascendete o descendente solo proporciona como segundo argumento
// la condicion en el order by

db.collection('usuarios')
  .orderBy('nombre')
  .orderBy('salario')
  .get()
  .then(mostrarDocumentos)



// ----------------TRABAJANDO CON PAGINACION---------------
// el limit te trae solo los elementos que solicites
// creando una paginacion con firebase
// el metodo startAfter recibe un argumento que indica desde donde empezara a pedir datos


db.collection('usuarios')
  .limit(2) // metodo limit trae un numero de documentos en base al argumento (number) proporcionado
  .get() // metodo para hacer una peticion de los documentos retorna una promesa
  .then(mostrarDocumentos)




const btnNext = document.createElement('button');
btnNext.innerHTML = 'Next Page';
document.body.append(btnNext);

let firstDocument: any = null;
let lastDocument: any = null;

btnNext.addEventListener('click', () => {

  const query = db.collection('usuarios')
    .orderBy('nombre') // metodo oderBy ordena los documentos
    .startAfter(lastDocument) // metodo para iniciar desde el indice proporcionado
  
  query.limit(2)
    .get()
    .then((snap) => {

      
      firstDocument = snap.docs[0] || null;
      lastDocument = snap.docs[snap.docs.length - 1] || null; 

      mostrarDocumentos(snap);
    })

})

btnNext.click();

// ------PAGINACION INVERSA------------

const btnPrevious = document.createElement('button');
btnPrevious.innerHTML = 'Previous Page';
document.body.append(btnPrevious);

btnPrevious.addEventListener('click', () => {

  const query = db.collection('usuarios')
    .orderBy('nombre') // se orden en orden ascendente por nombre
    .endBefore(firstDocument) // que termine antes de ese documento, obtener los anteriores a ese documento
  
  query.limit(2)
    .get()
    .then((snap) => {

      lastDocument = snap.docs[snap.docs.length - 1] || null; 
      firstDocument = snap.docs[0] || null;

      mostrarDocumentos(snap);
    })

})