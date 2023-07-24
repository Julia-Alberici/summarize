import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './app/Home';
import Pricing from './app/Pricing';
import Login from './app/Login';
import Register from './app/Register';
import Navigation from './components/Navigation';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);


const App = () => {
  return (
    <div>
      <main>
        <div className="main">
          <div className="gradient" />
        </div>

        <div className="app">
          <Navigation />
          <section className="mt-28 w-full max-w-xl">
            <RouterProvider router={router} />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App