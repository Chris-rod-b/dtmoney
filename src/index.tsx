import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import { createServer, Model } from 'miragejs';

import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de Website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2020-04-03').toLocaleDateString('pt-BR', {timeZone: 'UTC'}),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Apartamento',
          amount: 900,
          createdAt: new Date('2021-04-14').toLocaleDateString('pt-BR', {timeZone: 'UTC'}),
        },
        {
          id: 3,
          title: 'iFood',
          type: 'withdraw',
          category: 'Serviços',
          amount: 100,
          createdAt: new Date('2022-03-25').toLocaleDateString('pt-BR', {timeZone: 'UTC'}),
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api';
    
    this.get('/transactions',() => {
      return this.schema.all('transaction');  
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

const container = document.getElementById('root') as Element;

const root = ReactDOMClient.createRoot(container);

root.render(<App/>);
