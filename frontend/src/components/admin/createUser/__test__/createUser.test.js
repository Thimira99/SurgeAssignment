import React from 'react';

import ReactDOM from 'react-dom';

import CreateUser from '../createUser';

import { BrowserRouter } from 'react-router-dom';

import { cleanup } from '@testing-library/react';

import "@testing-library/jest-dom/extend-expect";



afterEach(cleanup);

it("renders without crashing", () => {

    const div = document.createElement("div");

    ReactDOM.render(

        <BrowserRouter>

            <CreateUser></CreateUser>

        </BrowserRouter>, div)

})

