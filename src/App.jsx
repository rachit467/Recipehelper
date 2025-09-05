import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router-dom";
import RootLayOut from "./components/RootLayOut";
import CategoryItems from "./pages/category-items/CategoryItems.jsx";
import Meal from "./pages/meal/Meal.jsx";
import Home from "./pages/home/Home.jsx";
import SearchPage from "./pages/search-meal/SearchPage.jsx";

export default function App() {

  const router = createBrowserRouter([

    {
      path: '/',
      element: <RootLayOut />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'category-items',
          element: <CategoryItems />
        },
        {
          path: 'meal/:id',
          element: <Meal />
        },
        {
          path: 'search-meal',
          element: <SearchPage />
        }

      ]
    },


  ]);

  return <RouterProvider router={router} />
}
