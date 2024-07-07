import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initStore } from '../../src/client/store';
import { CartApi, ExampleApi } from '../../src/client/api';
import { Form } from '../../src/client/components/Form';

import events from '@testing-library/user-event';

describe('Application', () => {
    it('форма ввода телефона работает корректно', async () => {
        // Подготовка
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);

        const app = (
            <Provider store={store}>
                <Form onSubmit={() => {}} />
            </Provider>
        );

        // Действие
        const { getByRole } = render(app);

        // Проверка
        const submitButton = getByRole('button', {
            name: /checkout/i,
        });
        events.click(submitButton);

        const phoneInput = getByRole('textbox', {
            name: /phone/i,
        });
        events.type(phoneInput, '800-555-3535');

        expect(
            phoneInput.className
                .split(' ')
                .some((className) => className === 'is-invalid')
        ).toBe(false);
    });
});
