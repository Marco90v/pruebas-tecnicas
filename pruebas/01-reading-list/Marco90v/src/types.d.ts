interface author {
    "name": string,
    "otherBooks": string[]
}

interface book {
    "book":{
        "title": string,
        "pages": number,
        "genre": string,
        "cover": string,
        "synopsis": string,
        "year": number,
        "ISBN": `${string}-${string}`,
        "author": author
    },
    "reading"?:boolean
}

interface genre {
  genre:string,
  quantity: number
}

interface library {
  genre:genre[],
  library: book[],
  reading: book[],
  filter:string,
  view:string,
  numberPages:number
}


type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};