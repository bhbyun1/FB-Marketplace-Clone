import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import Drawer from '../Drawer';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import CategoryContext from '../CategoryContext';

const currCat = 'Vehicles';
const search = '';
const dimensions = {width: 500};
const subList = [{names: 'Cars'}];
const catList = [{names: 'Pickles'}];
const setSub = jest.fn();
const setSearch = jest.fn();
const setCatList = jest.fn();
const setSubList = jest.fn();
const filList = [{names: 'Vehicle Color', attributes: {color1: 'White'}}];
const setFilList = jest.fn();
const setCategory = jest.fn();
const setFilter = jest.fn();

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

test('drawer render', async () => {
  render(
    <CategoryContext.Provider value={{currCat, dimensions, subList, setSub,
      setSearch, setCatList, setSubList, catList, search, filList, setFilList,
      setCategory, setFilter,
    }}>
      <Drawer/>
    </CategoryContext.Provider>,
  );
  await waitFor(() => screen.getByText('Pickles'));
  fireEvent.click(screen.getByText('Pickles'));
});
