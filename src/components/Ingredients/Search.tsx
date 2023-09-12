import React, { ChangeEvent, useState, useEffect } from "react";

import Card from "../UI/Card";
import Ingredient from "../../models/ingredient";
import useSearch from "./useSearch";

import "./Search.css";

interface PropType {
  onSearch: (data: Ingredient[]) => void;
  setFetchLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = React.memo(function ({ onSearch, setFetchLoading }: PropType) {
  const { handleSerchValue, isLoading } = useSearch();

  const [searchValue, setSearchValue] = useState("");
  async function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  useEffect(
    function () {
      setFetchLoading(true);
      const queryTimer = setTimeout(async function () {
        const { convertedData } = await handleSerchValue(searchValue);
        onSearch(convertedData ? convertedData : []);
        setFetchLoading(false);
      }, 750);

      return function () {
        clearTimeout(queryTimer);
      };
    },

    [handleSerchValue, searchValue, onSearch, setFetchLoading]
  );

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label htmlFor="search">Filter by Title</label>
          <input
            disabled={isLoading}
            type="text"
            id="search"
            value={searchValue}
            name="search"
            onChange={handleSearch}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
