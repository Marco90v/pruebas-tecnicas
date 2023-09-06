import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent  from '@testing-library/user-event';
import Button from './Button';
import { StyleCss, Texto, Types } from '../const';
import GlobalContext from '../Context/Global';
import Card from './Card';

describe('Test Component Button', () => {
    afterEach(() => {
        cleanup();
    });
    it('Debe mostrar texto pasado por props', () => {  
        const wrapper = render(<Button view={Types.ViewBooks} textButton={Texto.TextLibrosButton} />)
        const button = wrapper.container.querySelector('button')
        expect(button?.textContent).toBe(Texto.TextLibrosButton)
    });

    it("Debe cambiar la clase de estilo del texto del boton de slate-200 al green-400", async () => {
        render(
            <GlobalContext>
              <Button view={Types.ViewReading} textButton={Texto.TextLecturaButton} />
            </GlobalContext>
        )
        const user = userEvent.setup();
        const boton = screen.getByRole("button", {name:Texto.TextLecturaButton})
        expect(boton?.className).toContain(StyleCss.ButtonTextInActive)
        await user.click(boton as HTMLButtonElement)
        expect(boton?.className).toContain(StyleCss.ButtonTextActive)
        expect(boton?.className).not.toContain(StyleCss.ButtonTextInActive)
    })
});

describe('Test Component Card', () => {
    const item:book = {
        book:{
            "title": "El Señor de los Anillos",
              "pages": 1200,
              "genre": "Fantasía",
              "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
              "synopsis": "Una aventura épica en un mundo de fantasía llamado la Tierra Media.",
              "year": 1954,
              "ISBN": "978-0618640157",
              "author": {
                  "name": "J.R.R. Tolkien",
                  "otherBooks": [
                      "El Hobbit",
                      "El Silmarillion"
                  ]
              }
        }
    }
    afterEach(() => {
        cleanup();
    });
    it("Debe renderizar el contenido pasado por props", ()=>{
        render(
            <GlobalContext>
                <Card item={item} />
            </GlobalContext>
        )
        screen.getByText(`Titulo: ${item.book.title}`)
        screen.getByText(item.book.author.name)
        screen.getByText(item.book.synopsis)
        screen.getByText(`Paginas: ${item.book.pages} - Año: ${item.book.year}`)
        screen.getByText(`Categoria: ${item.book.genre}`)
    })
    it("Debe renderizar imagen con title en alt y cover en src",()=>{
        render(
            <GlobalContext>
                <Card item={item} />
            </GlobalContext>
        )
        const testImage = document.querySelector("img") as HTMLImageElement;
        expect(testImage.alt).toContain(item.book.title);
        expect(testImage.src).toContain(item.book.cover)
    })
});