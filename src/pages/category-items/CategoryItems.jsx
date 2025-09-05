import { useState, useEffect } from "react";
import { FiCopy, FiSun, FiMoon, FiStar, FiBookmark } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useApiHooks } from "../../hooks/apiHooks.js";

export default function CategoryItems() {
  const [copiedId, setCopiedId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const favs = localStorage.getItem("favouriteMeals");
    return favs ? JSON.parse(favs) : [];
  });

  useEffect(() => {
    localStorage.setItem("favouriteMeals", JSON.stringify(favorites));
  }, [favorites]);

  const handleShare = (idMeal) => {
    navigator.clipboard.writeText(`${window.location.origin}/meal/${idMeal}`);
    setCopiedId(idMeal);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const toggleFavorite = (idMeal) => {
    setFavorites((prev) =>
      prev.includes(idMeal)
        ? prev.filter((id) => id !== idMeal)
        : [...prev, idMeal]
    );
  };

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get("c");
  const [data, loading, error] = useApiHooks(
    "https://www.themealdb.com/api/json/v1/1/filter.php",
    { c: category }
  );

  // Skeleton loader
  if (loading)
    return (
      <div className={`flex flex-col justify-center items-center min-h-screen ${darkMode ? "bg-gray-900" : "bg-blue-50"} animate-fadeIn`}>
        <div className="w-full max-w-lg p-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center w-full h-16 mb-4 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full mr-4"></div>
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  if (error)
    return (
      <h1 className={`text-red-500 text-center mt-8 animate-fadeIn ${darkMode ? "bg-gray-900" : ""}`}>
        {error}
      </h1>
    );

  const meals = data?.meals || [];
  const favouriteMeals = meals.filter(meal => favorites.includes(meal.idMeal));

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className={`flex flex-col items-center min-h-screen bg-gradient-to-br ${darkMode ? "from-gray-900 to-gray-800" : "from-blue-50 to-blue-100"}`}>
        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode((d) => !d)}
          className="absolute top-4 right-4 px-3 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow flex items-center gap-2 transition"
          title="Toggle Dark Mode"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
          {darkMode ? "Light" : "Dark"}
        </button>

        {/* Favourites Card */}
        <Card className="w-full max-w-xs mb-6 shadow-lg rounded-xl p-4 bg-yellow-50">
          <Typography variant="h6" color="yellow" className="mb-3 text-center font-bold">
            Favourite Meals
          </Typography>
          {favouriteMeals.length > 0 ? (
            <div className="flex flex-wrap gap-3 justify-center">
              {favouriteMeals.map(meal => (
                <div
                  key={meal.idMeal}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => navigate(`/meal/${meal.idMeal}`)}
                  title={meal.strMeal}
                >
                  <Avatar
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-12 h-12 mb-1 border-2 border-yellow-400"
                  />
                  <span className="text-xs text-yellow-900 text-center max-w-[70px] truncate">{meal.strMeal}</span>
                </div>
              ))}
            </div>
          ) : (
            <Typography variant="small" color="yellow" className="text-center">
              No favourites yet.
            </Typography>
          )}
        </Card>

        {/* Main Meals Card */}
        <Card className={`w-full max-w-lg shadow-xl rounded-2xl p-6 animate-fadeIn ${darkMode ? "bg-gray-900 text-gray-100" : ""}`}>
          <Typography variant="h4" color={darkMode ? "white" : "blue"} className="mb-6 text-center font-bold">
            {category ? `${category} Meals` : "Meals"}
          </Typography>
          <List aria-label="Meal list">
            {meals.length > 0 ? (
              meals.map((meal) => (
                <ListItem
                  onClick={() => navigate(`/meal/${meal.idMeal}`)}
                  key={meal.idMeal}
                  className={`cursor-pointer transition-all duration-300 hover:bg-blue-100 dark:hover:bg-gray-800 hover:scale-105 hover:shadow-lg rounded-lg mb-2 flex items-center`}
                  aria-label={meal.strMeal}
                >
                  <ListItemPrefix>
                    <Avatar
                      variant="circular"
                      alt={meal.strMeal}
                      src={meal.strMealThumb}
                      className="w-16 h-16 border-2 border-blue-300 shadow"
                    />
                  </ListItemPrefix>
                  <Typography variant="h6" color={darkMode ? "white" : "blue-gray"} className="ml-4 font-medium flex-1">
                    {meal.strMeal}
                  </Typography>
                  {/* Favorite/Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(meal.idMeal);
                    }}
                    className={`ml-2 px-2 py-1 rounded-full transition flex items-center ${favorites.includes(meal.idMeal) ? "bg-yellow-400 text-white" : "bg-gray-200 dark:bg-gray-700 hover:bg-yellow-200"}`}
                    title={favorites.includes(meal.idMeal) ? "Unfavorite" : "Favorite"}
                  >
                    {favorites.includes(meal.idMeal) ? <FiStar /> : <FiBookmark />}
                  </button>
                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(meal.idMeal);
                    }}
                    className="ml-2 px-2 py-1 text-xs bg-blue-200 dark:bg-gray-700 rounded hover:bg-blue-400 dark:hover:bg-blue-900 transition flex items-center"
                    title="Copy Link"
                  >
                    <FiCopy className="w-4 h-4" />
                  </button>
                  {copiedId === meal.idMeal && (
                    <span className="ml-2 text-green-600 dark:text-green-400 text-xs">Link copied!</span>
                  )}
                </ListItem>
              ))
            ) : (
              <Typography
                variant="h6"
                color={darkMode ? "white" : "gray"}
                className="text-center py-8"
              >
                No meals found for this category.
              </Typography>
            )}
          </List>
        </Card>
      </div>
    </div>
  );
}