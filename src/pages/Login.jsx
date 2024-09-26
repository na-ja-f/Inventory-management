import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { postLogin } from "../services/apiMethods";
import { MoveRight } from "lucide-react"
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice";


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    //authenticator
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const submit = () => {
        event.preventDefault();
        let valid = true;

        if (!username.trim()) {
            setUsernameError("Enter username");
            valid = false;
        } else {
            setUsernameError("");
        }

        if (!password.trim()) {
            setPasswordError("enter password");
            valid = false;
        } else {
            setPasswordError("");
        }

        if (!valid) return;

        const values = {
            username,
            password,
        };

        postLogin(values)
            .then((response) => {
                const data = response.data;
                if (response.status === 200) {
                    toast.info(data.message);
                    dispatch(loginSuccess({ user: data }));
                    navigate("/");
                } else {
                    console.log(response.message);
                    toast.error("invalid credentials");
                }
            })
            .catch((error) => {
                toast.error("invalid credentials");
                console.log(error?.message);
            });
    };

    return (
        <>
            <form
                className="userFont bg-myBlack flex flex-col justify-center items-center h-screen liner rounded-lg"
                onSubmit={submit}
            >
                <h1 className="text-4xl text-white font-semibold">
                    Login
                </h1>

                <div className="flex flex-col h-auto w-3/12 mt-10 mb-10 gap-4">
                    <div className="flex flex-col gap-1">
                        <input
                            className="text-sm text-white bg-inputBoxBlack p-5 rounded-lg"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                        />
                        {usernameError && (<p className="text-red-500 text-sm">{usernameError}</p>)}
                    </div>

                    <div className="flex flex-col gap-1">
                        <input
                            className="text-sm text-white bg-inputBoxBlack p-5 rounded-lg"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                        />
                        {passwordError && (<p className="text-red-500 text-sm">{passwordError}</p>)}
                    </div>
                </div>

                <button
                    className="mt-5 bg-green-900 w-3/12 p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-between font-extrabold"
                    type="submit"
                >
                    Login to Your Account <MoveRight size={30} />
                </button>
            </form>
        </>
    )
}

export default Login
