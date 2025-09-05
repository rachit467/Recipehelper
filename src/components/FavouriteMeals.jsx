import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, Typography, Avatar, Spinner } from "@material-tailwind/react";

export default function FavouriteMeals() {
  const [mealDetails, setMealDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const favs = localStorage.getItem("favouriteMeals");
    const favIds = favs ? JSON.parse(favs) : [];
    if (favIds.length === 0) {
      setMealDetails([]);
      setLoading(false);
      return;
    }

    // Fetch details for each favourite meal
    Promise.all(
      favIds.map((id) =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then((res) => res.json())
          .then((data) => data.meals?.[0])
      )
    ).then((meals) => {
      setMealDetails(meals.filter(Boolean));
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner className="h-8 w-8" color="blue" />
        <span className="ml-4 text-lg">Loading favourites...</span>
      </div>
    );

  if (mealDetails.length === 0)
    return (
      <div className="py-8 text-center text-gray-500">
        <Typography variant="h6">No favourite meals yet.</Typography>
      </div>
    );

  return (
    <div className="py-8">
      <Typography variant="h4" color="blue" className="mb-6 text-center font-bold">
        Your Favourite Meals
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {mealDetails.map((meal) => (
          <Card
            key={meal.idMeal}
            className="p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/meal/${meal.idMeal}`)}
          >
            <Avatar
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-32 h-32 mb-4"
            />
            <Typography variant="h6" className="text-center mb-2">
              {meal.strMeal}
            </Typography>
            <Typography className="text-xs text-gray-500 text-center">
              {meal.strArea} &middot; {meal.strCategory}
            </Typography>
          </Card>
        ))}
      </div>
    </div>
  );
}