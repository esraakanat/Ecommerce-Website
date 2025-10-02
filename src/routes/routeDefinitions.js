// تعريف المسارات المركزية
export const appRoutes = {
  home: '/',
  products: {
    list: '/products',
    details: '/products/:id'
  },
  cart: {
    main: '/cart'
  },
  auth: {
    login: '/login',
    signup: '/signup'
  },
  contact:{
    main: '/contact'
  },
  about:{
    main: '/about'
  },
  wishlist:{
    main: '/wishlist'
  },
  checkout:{
    main: '/checkout'
  },
};
