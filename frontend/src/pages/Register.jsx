import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

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

            const res = await api.post(
                "/auth/register",
                form
            );

            toast.success(res.data.message);

            navigate("/");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">

            <Card>

                <h2 className="mb-2 text-center text-3xl font-bold">

                    Create Account

                </h2>

                <p className="mb-8 text-center text-slate-500">

                    Join DevSpace today

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <Input
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <Input
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                    />

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

                        {loading
                            ? "Creating Account..."
                            : "Register"}

                    </Button>

                </form>

                <p className="mt-6 text-center text-sm text-slate-500">

                    Already have an account?

                    <Link
                        to="/"
                        className="ml-1 font-semibold text-blue-600 hover:underline"
                    >

                        Login

                    </Link>

                </p>

            </Card>

        </div>

    );

}

export default Register;