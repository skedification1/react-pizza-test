//import React from 'react';
import {
  BrowserRouter as Router,
  //  Switch,
  Route,
  // Link,
  // useRouteMatch,
  //  useParams,
  Routes,
} from 'react-router-dom';

//import pizzas from './assets/pizzas.json';
import './scss/app.scss';
//import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import MainLayout from './pages/MainLayout';

//export const SearchContext = React.createContext();

function App() {
  //  const [searchValue, setSearchValue] = React.useState(''); // замена селектором
  //const count = useSelector((state) => state.counter.value);
  //const dispatch = useDispatch();

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/pizzas/:id" element={<FullPizza />} />
      </Route>
    </Routes>
  );
}

export default App;
//  <div className="wrapper">
{
  /* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */
}
//   <Header />

//   <div className="content">

////
////
////
////
// </div>
{
  /* </SearchContext.Provider> */
}
//  </div>
