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
    }
}

interface library {
  library: book[],
  reading: book[]
  filter:string

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