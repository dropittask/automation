import { test as base } from '@playwright/test';
import { Home } from './pages/home';
import { Catalog } from './pages/catalog';
import { Cart } from './pages/cart';
import { PetStore } from './pages/petStore';

type fixtures = {
  home: Home,
  catalog: Catalog,
  cart: Cart,
  petStore: PetStore
};

export const test = base.extend<fixtures>({
  home: async ({ page }, use) => { await use(new Home(page))},
  catalog: async ({ page }, use) => { await use(new Catalog(page)) },
  cart: async ({ page }, use) => { await use(new Cart(page)) },
  petStore: async ({ request }, use) => { await use(new PetStore(request)) }
});