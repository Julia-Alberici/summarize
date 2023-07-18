import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './app/Home';
import Pricing from './app/Pricing';
import { logo } from './assets';
import Login from './app/Login';
import Register from './app/Register';

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
          <nav className="flex justify-between items-center w-full mb-10 pt-3">
            <a href="/">
              <img src={logo} alt="sumz logo" className="w-28 object-contain" />
            </a>
            {/* TODO - Fix link to repo */}
            <div className="flex sm:justify-center space-x-4">
              <a href='/pricing' className="rounded-lg px-3 py-1.5 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">Pricing</a>
              <a href='/login' className='rounded-lg px-3 py-1.5 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900'>Login</a>
              <a href='/register' className='black_btn'>Sign Up</a>
            </div>
          </nav>
          <RouterProvider router={router} />
        </div>
      </main>
    </div>
  )
}

export default App