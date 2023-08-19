import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent  from '@testing-library/user-event';
import Button from './Button';
import { Texto, Types } from '../const';
import GlobalContext from '../Context/Global';

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
        expect(boton?.className).toContain("text-slate-200")
        await user.click(boton as HTMLButtonElement)
        expect(boton?.className).toContain("text-green-400")
        expect(boton?.className).not.toContain("text-slate-200")
    })
});