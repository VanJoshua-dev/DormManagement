import React, { useState, useEffect } from "react";
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export default function useLogin({ username, password }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const request = await axios.post("http://localhost:3000/api/auth/", {
                username,
                password
            },
                {
                    withCredentials: true
                })

            console.log(request.data.user_data[0]);


            if (request.status === 200) {
                const result = await Swal.fire({
                    icon: "success",
                    title: "Login Success",
                    text: "You've login successfully. Please click 'Continue' to proceed.",
                    showConfirmButton: true,
                    confirmButtonText: "Continue",
                    confirmButtonColor: "#2196F3"
                })


                setUser(request.data.user_data[0])
                if (result.isConfirmed) {
                    localStorage.setItem("user", JSON.stringify({ name: request.data.user_data[0].full_name, userId: request.data.user_data[0].id, role: request.data.user_data[0].role, username: request.data.user_data[0].username }));
                    navigate("/dashboard", { replace: true });
                }
            }


        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Incorrect credentials. Please check your credentials and try again.",
                showConfirmButton: true,
                confirmButtonText: "Continue",
                confirmButtonColor: "#2196F3"
            })
        } finally {
            setLoading(false)
        }

    }

    return { loading, handleSubmit };
}

import { useAuth } from "../auth-context";

export function useRefresh() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const refreshToken = async () => {
        try {
            const req = await axios.post(
                "http://localhost:5000/api/validate/refresh",
                {},
                { withCredentials: true }
            );

            return req.data;
        } catch (error) {
            if (error.response?.status === 403) {
                const result = await Swal.fire({
                    icon: "warning",
                    title: "Session Expired!",
                    text: "Login again.",
                    allowOutsideClick: false,
                    buttonsStyling: false,
                    customClass: {
                        confirmButton:
                            "bg-[#2563EB] text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 hover:scale-125 transition-all transform duration-300"
                    },
                    showClass: {
                        popup: "animate__animated animate__fadeInDown"
                    },
                    hideClass: {
                        popup: "animate__animated animate__zoomOut"
                    }
                });

                if (result.isConfirmed) {
                    setAuth({
                        accessToken: null,
                        role: null,
                        name: null,
                        username: null,
                        email: null,
                        userID: null,
                    });
                    navigate("/", { replace: true });
                }
            }
        }
    };

    return { refreshToken }

}