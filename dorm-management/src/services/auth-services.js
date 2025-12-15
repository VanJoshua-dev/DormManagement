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
                    localStorage.setItem("user", JSON.stringify(request.data.user_data[0]));
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