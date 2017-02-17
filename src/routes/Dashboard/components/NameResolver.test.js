import test from 'ava';
import NameResolver from './NameResolver';

const dashboard = {
  'distribution-centers': [
    {
      id: 1,
      address: {
        city: 'DC',
      },
    },
  ],
  retailers: [
    {
      id: 1,
      address: {
        city: 'Retailer',
      },
    },
  ],
};

test('Resolves names', t => {
  t.is('DC', NameResolver(dashboard).resolve('distributionCenter', 1));
  t.is('Retailer', NameResolver(dashboard).resolve('retailer', 1));
  t.is('*123*', NameResolver(dashboard).resolve('unknownType', 123));
});
