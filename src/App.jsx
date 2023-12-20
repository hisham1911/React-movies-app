// import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './pages/about/About';
import Contact from './pages/contct/Contact'; 
import Movies from './pages/movies/Movies.jsx';
import NotFound from './pages/notFound/NotFound';
import LogIn from './pages/login/LogIn';
import Register from './pages/register/Register';
import Details from './pages/details/Details';
import AppLayout from './AppLayout/AppLayout';
import SearchResults from './component/searchResults/searchResults';
import {Provider} from 'react-redux'
import store from './store/store';
import Favorites from './pages/favorites/Favorites';
import { LanguageProvider } from './contexts/language';
import { useState } from 'react';
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Movies /> ,errorElement:<NotFound/>},
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/login', element: <LogIn /> },
      { path: '/register', element: <Register /> },
      { path: '/details/:id', element: <Details /> },
      { path: '/search', element: <SearchResults /> },
      { path: '*', element: <NotFound /> },
      { path: '/favorites', element: <Favorites />}
    ],
  },
]);

function App() {
  const [language,setLanguage]= useState('en')
  return (
    <LanguageProvider value={{language,setLanguage}}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider> 
    </LanguageProvider>
  );
}

export default App;
