import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await api.post("/auth/login", form);

            localStorage.setItem("token", res.data.data.token);

            navigate("/dashboard");

        } 
        catch (err) {

            console.log(err);

            console.log(err.response);

            console.log(err.response?.data);

            alert(
                err.response?.data?.message || "Login Failed"
            );

        } 
        finally {

            setLoading(false);

        }

    };

    return (
        <div className="grid min-h-screen lg:grid-cols-[45%_55%]">

            {/* Left */}
            <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 px-20 text-white">

                <Logo />

                <h2 className="mt-10 text-5xl font-bold leading-tight">
                    Manage your work,
                    <br />
                    together.
                </h2>

                <p className="mt-6 max-w-md text-lg text-blue-100">
                    DevSpace helps teams manage projects,
                    track tasks and collaborate.
                </p>

            </div>

            {/* Right */}
            <div className="flex items-center justify-center bg-slate-100 px-6">

                <Card>

                    <h2 className="mb-2 text-center text-3xl font-bold">
                        Welcome Back
                    </h2>

                    <p className="mb-8 text-center text-slate-500">
                        Sign in to continue
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <Input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                        />

                        <Button type="submit">

                            {loading ? "Logging in..." : "Login"}

                        </Button>

                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Don't have an account?

                        <Link
                            to="/register"
                            className="ml-1 font-semibold text-blue-600 hover:underline"
                        >
                            Register
                        </Link>

                    </p>

                </Card>

            </div>

        </div>
    );
}

export default Login;