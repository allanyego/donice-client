import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../services/context";
import restaurantService from "../services/restaurants";

export default function Restaurant() {
    const initialState = {
        id: null,
        name: '',
        address: {},
        cuisine: '',
        reviews: []
    };

    const [restaurant, setRestaurant] = useState(initialState);
    const {id} = useParams();
    const {user} = useAppContext();

    const getRestaurants = id => {
        restaurantService.get(id)
        .then(resp => {
            setRestaurant(resp.data);
        })
        .catch(e => console.log(e));
    };

    const deleteReview = (reviewId, index) => {
        restaurantService.deleteReview(reviewId, user.id)
        .then(resp => {
            console.log("Delete resp", resp.data);
            setRestaurant(prevState => {
                prevState.reviews = prevState.reviews.filter(review => review._id !== reviewId);
                return({
                    ...prevState
                });
            });
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        getRestaurants(id);
    }, [id]);

    return(
        <div>
            {restaurant ? (
                <div>
                    <h5>{restaurant.name}</h5>
                    <p>
                        <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                        <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
                    </p>
                    <Link to={`/restaurants/${id}/review`} className="btn btn-primary">
                        Add review
                    </Link>

                    <h4>Reviews</h4>
                    <div className="row">
                        {restaurant.reviews.length > 0 ? (
                            restaurant.reviews.map((review, index) => {
                                return(
                                    <div className="col-xs-12 col-sm-6 col-md-4 pb-1" key={index}>
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text">
                                                    {review.text}<br />
                                                    <strong>User: </strong>{review.name}<br />
                                                    <strong>Date: </strong>{review.date}
                                                </p>

                                                {user && user.id === review.user_id && 
                                                    <div className="row justify-content-center">
                                                        <a onClick={() => deleteReview(review._id, index)} className="btn btn-danger col-5 mx-1 mb-1">Delete</a>
                                                        <Link 
                                                        to={`/restaurants/${id}/review`} 
                                                        state={{
                                                            currentReview: review
                                                        }}
                                                        className="btn btn-primary col-5 mx-1 mb-1">Edit</Link>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div>
                                <br />
                                <p>No reviews yet</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                <br />
                <h3>No restaurant selected</h3>
                </div>
            )}
        </div>
    );
}