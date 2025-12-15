import React, { useState, useEffect } from "react";
import axios from "axios"
import Swal from "sweetalert2"

export default function useFetchTenants(params = {}) {
    const [loading, setLoading] = useState(true);
    const [tenants, setTenants] = useState([]);

    console.log(JSON.stringify(params))

    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        showClass: {
            popup: "animate_animated animate__fadeIn",
        },
        hideClass: {
            popup: "animate__animated animate__bounceOutRight",
        },
    });

    const fetchTenants = async () => {
        try {
            const request = await axios.get(`http://localhost:3000/api/tenants/?search=${params.search}&status=${params.status}&move_in_date=${params.move_in_date}`);
            setTenants(request.data.tenants);
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Fetch Error",
                text: "Network error or service is down",
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTenants();
    }, [JSON.stringify(params)]);

    return { loading, tenants }
}