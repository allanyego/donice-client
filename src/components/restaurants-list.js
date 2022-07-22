import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      .then((resp) => {
        setRestaurants(resp.data.restaurants);
      })
      .catch((e) => {
        console.log(`Error, ${e}`);
      });
  };

  const getCuisines = () => {
    restaurantService
      .getCuisines()
      .then((resp) => {
        setCuisines([...cuisines, ...resp.data]);
      })
      .catch((e) => {
        console.log(`Error, ${e}`);
      });
  };

  const onNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const onZiphange = (e) => {
    setSearchZip(e.target.value);
  };

  const onCuisineChange = (e) => {
    setSearchCuisine(e.target.value);
  };

  const find = (query, by) => {
    restaurantService
      .find(query, by)
      .then((resp) => {
        setRestaurants(resp.data.restaurants);
      })
      .catch((e) => console.log(`Error, ${e}`));
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
      {/* Search bar */}
      <div className="row pb-1">
        <div className="col-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={onNameChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>

        <div className="col-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchZip}
              onChange={onZiphange}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>

        <div className="col-4">
          <div className="input-group">
            <select onChange={onCuisineChange}>
              {cuisines.map((cuisine) => (
                <option value={cuisine} key={cuisine}>
                  {cuisine.substring(0, 20)}
                </option>
              ))}
            </select>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {/* End of searchbar */}

      {/* Restaurant list */}
      <div className="row">
        {restaurants.map((restaurant) => {
          const { building, street, zipcode } = restaurant.address;
          const address = `${building} ${street} ${zipcode}`;

          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="cart-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>

                  <div className="row">
                    <Link
                      to={`/restaurants/${restaurant._id}`}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Reviews
                    </Link>
                    <a
                      target="_blank"
                      href={"https://www.google.com/maps/place/" + address}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* End of restaurant list */}
    </div>
  );
}
