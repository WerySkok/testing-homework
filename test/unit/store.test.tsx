import { addToCart, initStore } from '../../src/client/store';
import { CartApi, ExampleApi } from '../../src/client/api';

describe('Redux store', () => {
    it('заказ добавляется в корзину', async () => {
        // Подготовка
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);

        // Действие
        store.dispatch(
            addToCart({
                id: 0,
                name: 'Tasty kogtetochka',
                description: 'Really Elegant kogtetochka for Himalayan',
                price: 828,
                color: 'teal',
                material: 'Metal',
            })
        );

        // Проверка
        expect(store.getState().cart[0]).toStrictEqual({
            name: 'Tasty kogtetochka',
            price: 828,
            count: 1,
        });
    });
});
