import { Texto } from "../const"

export const getCategorys = (prev:genre[],next:book):genre[] => {
    const exist = prev.find( ({genre}:genre) => genre === next.book.genre)
    if(!exist){
        prev.push({
            genre: next.book.genre,
            quantity:1
        })
    } else {
        return prev.map( g => {
            return g.genre=== next.book.genre ? { ...g, quantity:g.quantity+1 } : g
        })
    }
    return prev
}

export const getTotalBooks = (books:book[]):genre => {
    return {
        genre:Texto.Todos,
        quantity:books.length
    }
}

export const booksAvailable = (state:library):number => {
    return (state.genre[0]?.quantity - state.reading.length) | 0
}

export const booksReading = (state:library) => {
    return state.reading.length | 0
}

export const filterByPages = (books:book[], filter:number):book[] => {
    return books.filter( (book:book) => {
        return book.book.pages > filter
    })
}

export const filterByGenre = (books:book[], filter:string):book[] => {
    return books.filter( (book:book) => book.book.genre === filter )
}

export const filterByReading = (books:book[], reading:book[]):book[] => {
    return books.map( book => {
        return reading.find( b => b.book.ISBN === book.book.ISBN) ? {...book, reading:true} : book
    })
}