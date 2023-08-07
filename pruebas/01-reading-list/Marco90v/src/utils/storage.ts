export const getLocalStorage = ():book[] => {
    const books = localStorage.getItem("fav")
    return books ? (JSON.parse(books) as book[]) : []
}

export const addLocalStorage = (books:book[]) => {
    localStorage.setItem("fav", JSON.stringify(books))
}
