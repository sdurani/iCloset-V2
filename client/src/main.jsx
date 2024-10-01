import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import './App.css';
import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx';
import MyCloset from './components/MyCloset.jsx';
import NewItemForm from './components/NewItemForm.jsx';
import OutfitMaker from './components/OutfitMaker.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/my_closet",
        element: <MyCloset/>
      },
      {
        path: "/",
        element: <NewItemForm/>
      },
      {
        path: "/outfit_maker",
        element: <OutfitMaker/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);