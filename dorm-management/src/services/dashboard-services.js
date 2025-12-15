import React, { useState, useEffect } from "react";
import axios from "axios"
import Swal from "sweetalert2"


export default function useDashboardService() {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashoardData] = useState([]);
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

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/dashboard/");
            setDashoardData(response.data.dashboard_data);
            console.log(response.data.dashboard_data)
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Fetch Error",
                text: "Network error or service is down",
            });
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return { loading, dashboardData };
}