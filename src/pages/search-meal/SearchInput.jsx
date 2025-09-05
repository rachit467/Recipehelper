import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchInput() {
  const [search, setSearch] = useState('');
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    nav(`/search-meal?query=${search}`);

  }
  return (
    <div className="flex justify-center items-center p-5">

      <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-5">

        <div className="grow">
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            label="meal-search" />
        </div>
        <Button type="submit">Search</Button>

      </form>



    </div>
  )
}
