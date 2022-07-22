import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAppContext } from "../services/context";
import restaurantsService from "../services/restaurants";

export default function AddReview() {
    let initialState = '';
    let editing = false;

    const location = useLocation();
    const params = useParams();
    const {state} = location;
    const {user} = useAppContext();

    if (state && state.currentReview) {
        editing = true;
        initialState = state.currentReview.text;
    }

    const [review, setReview] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        setReview(event.target.value);
    };

    const saveReview = () => {
        const data = {
            text: review,
            name: user.name,
            user_id: user.id,
            restaurant_id: params.id,
        };

        if (editing) {
            data.review_id = state.currentReview._id;
            restaurantsService.updateReview(data)
            .then(resp => {
                setSubmitted(true);
                console.log(resp.data);
            })
            .catch(console.log);
        } else {
            restaurantsService.createReview(data)
            .then(resp => {
                setSubmitted(true);
                console.log(resp.data);
            })
            .catch(console.log);
        }
    };

    return(
        <div>
            {user ? (
                <div className="row mx-1">
                    <div className="card col-sm-12 col-md-6 mx-auto">
                    <div className="card-body">
                    <div className="submit-form">
                    {submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <Link to={`/restaurants/${params.id}`} className="btn btn-success">Back to Restaurant</Link>
                        </div>
                    ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="text">{editing ? 'Edit' : 'Create'} Review</label>
                            <input 
                            type="text"
                            className="form-control"
                            id="text"
                            name="text"
                            value={review}
                            onChange={handleInputChange}
                            required
                            />
                        </div>
                        <button onClick={saveReview} className="btn btn-success mt-2">Submit</button>
                    </div>
                    )}
                </div>
                    </div>
                </div>
                </div>
            ) : (
                <div>Please log in.</div>
            )}
        </div>
    );
}