import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Application } from '../../src/client/Application';
import { Provider } from 'react-redux';
import { initStore } from '../../src/client/store';
import events from '@testing-library/user-event';
import { CartApi, ExampleApi } from '../../src/client/api';

describe('Application', () => {
    it('при выборе элемента из меню "гамбургера", меню должно закрываться', async () => {
        // Подготовка
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        const app = (
            <MemoryRouter basename={basename} initialEntries={['/hw/store']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        const { container } = render(app);

        // Действие
        const toggler = container.querySelector('.Application-Toggler')!;

        await events.click(toggler);

        await events.click(
            container.querySelector('.Application-Menu a:nth-child(1)')!
        );

        // Проверка
        const menu = container.querySelector('.Application-Menu')!;
        expect(menu.className.split(' ')).toContain('collapse');
    });
});
