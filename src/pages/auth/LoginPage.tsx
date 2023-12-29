import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import useTheme from "../../api/theme.ts";
import { toastr } from "../../components/utils/toastr";

const LoginPage = () => {
    const theme = useTheme()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const login = useMutation(["login"], {
        mutationFn: async () => {
            const res = await axios.post(`/api/v1/auth/login`, {
                email,
                password,
            });
            return res.data;
        },
    onSuccess: (data) => {
            localStorage.setItem("user_id", data.data.id)
            localStorage.setItem("user_name", data.data.name);
            localStorage.setItem("user_email", data.data.email);
            localStorage.setItem("token", data.token);
            queryClient.invalidateQueries({queryKey: ["me"]})
            console.log("login_data:", data)
            if (data.manager) {
                navigate("/manager");
            } else {
                navigate("/driver");
            }
            toastr.success("Erfolgreich angemeldet");
        },
        onError: (err) => {
            console.log("login error", err)
            toastr.warning("Bitte versuchen Sie es später noch einmal");
        }
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src={theme.logo}
                    alt="Your Company"
                />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Passwort
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                login.mutate()
                            }}
                            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Anmelden
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    © 2023 BKF Manager. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default LoginPage
