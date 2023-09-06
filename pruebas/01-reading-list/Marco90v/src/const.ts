export enum Types {
    setInitialData = "setInitialData",
    All = "Todos",
    changeCategoryFilter = "changeCategoryFilter",
    AddBookReading = "AddBookReading",
    RemoveBookReading = "RemoveBookReading",
    ChangeView = "ChangeView",
    ViewBooks = "Books",
    ViewReading = "Reading",
    ChangeNumbersPages = "ChangeNumbersPages",
    UpdateReading = "UpdateReading",
}

export enum Status {
    wait = "wait",
    loading = "loading",
    completed = "completed",
    error = "error"
}

export enum Texto {
    Todos = "Todos",
    TextLibrosButton = "Libros",
    TextLecturaButton = "Lectura",
    BooksAvailable = "Libros disponibles",
    BooksReading = "Libros leyendo"
}

export enum Storage {
    fav = "fav"
}

export enum ActionFunction {
    BooksAvailable = "BooksAvailable",
    BooksReading = "BooksReading"
}

export enum StyleCss {
    ButtonTextActive = "text-green-400",
    ButtonTextInActive = "text-slate-200",
    IsReading = "card-reading",
    IsNotReading = "group/item card-not-reading",
}