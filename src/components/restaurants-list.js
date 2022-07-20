import { useEffect, useState } from "react";

import restaurantService from "../services/restaurants";

export default function RestaurantsList() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All cuisines"]);

  useEffect(() => {
    getRestaurants();
    getCuisines();
  }, []);

  const getRestaurants = () => {
    restaurantService
      .getAll()
      .then(resp => {
        setRestaurants(resp.data.restaurants);
      })
      .catch(e => {
        console.log(`Error, ${e}`);
      });
  };

  const getCuisines = () => {
    restaurantService
      .getCuisines()
      .then(resp => {
        setCuisines([...cuisines, ...resp.data]);
      })
      .catch(e => {
        console.log(`Error, ${e}`);
      });
  };

  const onNameChange = e => {
    setSearchName(e.target.value);
  };

  const onZiphange = e => {
    setSearchZip(e.target.value);
  };

  const onCuisineChange = e => {
    setSearchCuisine(e.target.value);
  };

  const find = (query, by) => {
    restaurantService
      .find(query, by)
      .then(resp => {
        setRestaurants(resp.data.restaurants);
      })
      .catch(e => console.log(`Error, ${e}`));
  };

  const refreshList = () => {
      getRestaurants();
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  const findByCuisine = () => {
    if (searchCuisine === "All cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
}
