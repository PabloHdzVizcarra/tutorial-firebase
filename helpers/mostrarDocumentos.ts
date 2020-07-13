import firebase from 'firebase';


export const mostrarDocumentos = (snapshot: firebase.firestore.QuerySnapshot) => {

  const documents: any[] = [];

  snapshot.forEach((snapChild) => {

    documents.push({
      id: snapChild.id,
      ...snapChild.data()
    });
  });

  console.log(documents);
  return documents

}