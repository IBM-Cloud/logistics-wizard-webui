export const NameResolver = (dashboard) => ({
  resolve: (type, id) => {
    switch (type) {
      case 'distributionCenter':
        return dashboard['distribution-centers']
          .find(dc => dc.id === id).address.city;
      case 'retailer':
        return dashboard.retailers
          .find(retailer => retailer.id === id).address.city;
      default:
        return `*${id}*`;
    }
  },
});

export default NameResolver;
