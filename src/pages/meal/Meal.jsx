import { useParams } from "react-router";
import { useApiHooks } from "../../hooks/apiHooks.js";
import Loader from "../../components/Loader"; // Adjust path if needed

export default function Meal() {
  const { id } = useParams();

  const [data, load, err] = useApiHooks(
    "https://www.themealdb.com/api/json/v1/1/lookup.php",
    { i: id }
  );

  if (load)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  if (err)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-xl text-red-500">{err}</h1>
      </div>
    );


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {data &&
        data.meals.map((meal) => {
          const vidId = meal.strYoutube?.split("=")[1];

          // Collect ingredients and measures
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
              ingredients.push({ ingredient, measure });
            }
          }

          return (
            <div
              key={meal.idMeal}
              className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl w-full space-y-8"
            >
              <h1 className="text-3xl font-bold text-blue-900 text-center mb-4">
                {meal.strMeal}
              </h1>
              <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                <img
                  className="h-[260px] w-[340px] object-cover rounded-xl shadow"
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                />
                {vidId && (
                  <iframe
                    width="340"
                    height="260"
                    src={`https://www.youtube.com/embed/${vidId}`}
                    title="Meal Video"
                    className="rounded-xl shadow"
                  ></iframe>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">
                  Ingredients
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-blue-200 rounded-lg">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="py-2 px-4 text-left">Ingredient</th>
                        <th className="py-2 px-4 text-left">Measure</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredients.map((item, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="py-2 px-4">{item.ingredient}</td>
                          <td className="py-2 px-4">{item.measure}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">
                  Instructions
                </h2>
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {meal.strInstructions}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}