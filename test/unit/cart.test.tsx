import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { checkoutComplete, initStore } from '../../src/client/store';
import { CartApi, ExampleApi } from '../../src/client/api';
import { Cart } from '../../src/client/pages/Cart';

describe('Application', () => {
    it('при оформленном заказе высвечивается окно с подтверждением заказа', async () => {
        // Подготовка
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        const app = (
            <MemoryRouter basename={basename} initialEntries={['/hw/store/cart']}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </MemoryRouter>
        );
        
        // Действие
        store.dispatch(checkoutComplete(1));
        const { container } = render(app);

        // Проверка
        const successMessage = container.querySelector('.Cart-SuccessMessage')!;
        expect(successMessage.className.split(' ')).toContain('alert-success');
    });
});
