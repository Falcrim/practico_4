import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import ListaGenero from './pages/generos/ListaGeneros.jsx';
import FormGenero from './pages/generos/FormGenero.jsx';
import FotoGenero from './pages/generos/FotoGenero.jsx';
import ListaArtista from './pages/artistas/ListaArtistas.jsx';
import FotoArtista from './pages/artistas/FotoArtista.jsx';
import FormArtista from './pages/artistas/FormArtista.jsx';
import ListaAlbum from './pages/albums/ListaAlbums.jsx';
import FormAlbum from './pages/albums/FormAlbum.jsx';
import FotoAlbum from './pages/albums/FotoAlbum.jsx';
import ListaCancion from './pages/canciones/ListaCanciones.jsx';
import FormCancion from './pages/canciones/FormCancion.jsx';
import AudioCancion from './pages/canciones/AudioCancion.jsx';
import App from './App.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ListaGenero />,
  },
  //Generos
  {
    path: "adm/genero",
    element: <ListaGenero />
  },
  {
    path: "adm/genero/create",
    element: <FormGenero />
  },
  {
    path: "adm/genero/:id",
    element: <FormGenero />
  },
  {
    path: 'adm/genero/:id/foto',
    element: <FotoGenero />
  },
  //Artistas
  {
    path: "adm/artista",
    element: <ListaArtista />
  },
  {
    path: "adm/artista/create",
    element: <FormArtista />
  },
  {
    path: "adm/artista/:id",
    element: <FormArtista />
  },
  {
    path: 'adm/artista/:id/foto',
    element: <FotoArtista />
  },
  //Albums
  {
    path: "adm/album",
    element: <ListaAlbum />
  },
  {
    path: "adm/album/create",
    element: <FormAlbum />
  },
  {
    path: "adm/album/:id",
    element: <FormAlbum />
  },
  {
    path: 'adm/album/:id/foto',
    element: <FotoAlbum />
  },
  //Canciones
  {
    path: "adm/cancion",
    element: <ListaCancion />
  },
  {
    path: "adm/cancion/create",
    element: <FormCancion />
  },
  {
    path: "adm/cancion/:id",
    element: <FormCancion />
  },
  {
    path: 'adm/cancion/:id/audio',
    element: <AudioCancion />
  },

  //Clente
  {
    path: "/spoti-prueba",
    element: <App />
  },

  {
    path: '*',
    element: <App />
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
