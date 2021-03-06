import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import BreadCrumbs from '../BreadCrumbs';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import CategoryContext from '../CategoryContext';

const currCat = 'Vehicles';
const dimensions = {width: 500};
const setSub = jest.fn();
const setSearch = jest.fn();
const setCatList = jest.fn();
const setCategory = jest.fn();
const setFilter = jest.fn();
const currSub = 'Cars';

const filter = '/v0/listings/category';

const server = setupServer(
  rest.get(filter, (req, res, ctx) => {
    return res(
      ctx.json([{names: 'Vehicle Color', attributes: {color1: 'White'}}]));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('breadcrumb render', async () => {
  render(
    <CategoryContext.Provider value={{currCat, dimensions, setSub,
      setSearch, setCatList, setCategory, setFilter, currSub,
    }}>
      <BreadCrumbs />
    </CategoryContext.Provider>,
  );
  await waitFor(() => screen.getByText('MARKETPLACE'));
  fireEvent.click(screen.getByText('MARKETPLACE'));
  await waitFor(() => screen.getByText('Vehicles'));
  fireEvent.click(screen.getByText('Vehicles'));
  await new Promise((r) => setTimeout(r, 2000));
  expect(currCat).toBe('Vehicles');
});
