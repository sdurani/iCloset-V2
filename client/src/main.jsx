import React from 'react';
import {createRoot} from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import './App.css';
import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx';
import MyCloset from './components/MyCloset.jsx';
import NewItemForm from './components/NewItemForm.jsx';
import OutfitMaker from './components/OutfitMaker.jsx';
import MyOutfits from './components/MyOutfits.jsx';
import Home from './components/Home.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <NewItemForm/>
      },
      {
        path: "/my_closet",
        element: <MyCloset/>
      },
      {
        path: "/add_item",
        element: <NewItemForm/>
      },
      {
        path: "/outfit_maker",
        element: <OutfitMaker/>
      },
      {
        path: "/my_outfits",
        element: <MyOutfits/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(<RouterProvider router={router}/>);