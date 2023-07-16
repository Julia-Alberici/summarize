import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './app/Home';
import Pricing from './app/Pricing';
import { logo } from './assets';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
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
            <img src={logo} alt="sumz logo" className="w-28 object-contain" />
            {/* TODO - Fix link to repo */}
            <div>
              <button type="button" onClick={() => window.open('/')} className='black_btn'>Sign Up</button>
            </div>
          </nav>
          <RouterProvider router={router} />
        </div>
      </main>
    </div>
  )
}

export default App