import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';

import './custom.scss'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
    </Layout>
);
