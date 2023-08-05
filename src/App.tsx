import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './views/home';
import Navigation from './components/navigation';
import Login from './views/login';
import Register from './views/register';
import Pricing from './views/pricing';

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