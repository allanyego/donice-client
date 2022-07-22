import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../services/context";

export default function Login() {
    const initialState = {
        name: '',
        id: '',
    };

    const [user, setUser] = useState(initialState);
    const {login} = useAppContext();
    const navigate = useNavigate();

    const handleInputChange = event => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };

    const loginUser = () => {
        login(user);
        navigate('/');
    };

    return(
        <div className="row mt-3">
            <div className="submit-form card mx-auto col-sm-12 col-md-6">
            <h4 className="text-center mt-2">Login</h4>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    required
                     />
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="name">ID</label>
                    <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    value={user.id}
                    onChange={handleInputChange}
                    required
                     />
                </div>

                <button onClick={loginUser} className="btn btn-success">Login</button>
            </div>
            
        </div>
        </div>
    );
}