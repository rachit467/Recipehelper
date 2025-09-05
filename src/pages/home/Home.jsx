import MealCategory from "../meal-category/MealCategory.jsx";
import SearchInput from "../search-meal/SearchInput.jsx";
import FavouriteMeals from "../../components/FavouriteMeals.jsx"; // Adjust path if needed

export default function Home() {
  return (
    <div>
      <SearchInput />
      <MealCategory />
    </div>
  );
}