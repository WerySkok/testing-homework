import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initStore } from '../../src/client/store';
import { CartApi, ExampleApi } from '../../src/client/api';
import { ProductDetails } from '../../src/client/components/ProductDetails';

describe('Application', () => {
    it('на странице продукта кнопка добавления в корзину большая', async () => {
        // Подготовка
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        const product = {
            id: 0,
            name: 'Tasty kogtetochka',
            description: 'Really Elegant kogtetochka for Himalayan',
            price: 828,
            color: 'teal',
            material: 'Metal',
        };

        const app = (
            <MemoryRouter
                basename={basename}
                initialEntries={['/hw/store/catalog/0']}
            >
                <Provider store={store}>
                    <ProductDetails product={product} />
                </Provider>
            </MemoryRouter>
        );

        // Действие
        const { getByRole } = render(app);

        // Проверка
        const button = getByRole('button', {
            name: /add to cart/i,
        });
        expect(button.className.split(' ')).toContain('btn-lg');
    });
});
