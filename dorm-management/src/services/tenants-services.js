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

export const useUpdatePaymentStatus = () => {
    const [loading, setLoading] = useState(false);


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

    const update_payment = async (name, tenantID, status) => {

        try {
            const result = await Swal.fire({
                icon: "question",
                title: "Are you sure?",
                text: `You're about to update ${name}'s pament status to ${status}`,
                showCancelButton: true,
                cancelButtonText: "Cancel",
                showConfirmButton: true,
                confirmButtonText: "Update",
                allowOutsideClick: false,
                draggable: false
            })

            if (result.isConfirmed) {
                setLoading(true)
                const request = await axios.patch("http://localhost:3000/api/tenants/update_payment",
                    { tenantID, status }
                )

                if (request.status === 200) {
                    Toast.fire({
                        icon: "success",
                        title: "Payment Updated",
                        text: `You've updated ${name}' payment status to ${status}`
                    })
                }
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Failed to update payment status",
                text: "Network error or server is down",
            })
        } finally {
            setLoading(false);
        }

    }

    return { loading, update_payment }
}

export const useRemoveTenant = () => {
    const [loading1, setLoading] = useState(false);


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

    const remove_tenant = async (name, tenantID) => {
        console.log(tenantID);
        try {
            const result = await Swal.fire({
                icon: "question",
                title: "Are you sure?",
                text: `You're about to remove ${name} to the tenant list`,
                showCancelButton: true,
                cancelButtonText: "Cancel",
                showConfirmButton: true,
                confirmButtonText: "Remove",
                allowOutsideClick: false,
                draggable: "false"
            })

            if (result.isConfirmed) {
                setLoading(true)
                const request = await axios.delete(`http://localhost:3000/api/tenants/remove_tenant/${tenantID}`)

                if (request.status === 200) {
                    Toast.fire({
                        icon: "success",
                        title: "Tenant has been removed",
                        text: `You've successfully removed ${name} from tenant list.`
                    })
                }
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Failed to remove tenant",
                text: "Network error or server is down"
            })
        } finally {
            setLoading(false);
        }
    }

    return { loading1, remove_tenant }
}

export const useChangeRoom = ({ roomID, tenantID, name }, onSuccess = () => { }) => {
    const [loading2, setLoading] = useState(false);
    console.log("roomID: ", roomID);
    console.log("tenantID: ", tenantID);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await Swal.fire({
                icon: "question",
                title: "Are you sure?",
                text: `You're about to change ${name}'s room`,
                showCancelButton: true,
                cancelButtonText: "Cancel",
                showConfirmButton: true,
                confirmButtonText: "Continue",
                allowOutsideClick: false,
                draggable: false
            })

            if (result.isConfirmed) {
                setLoading(true);
                const request = await axios.put("http://localhost:3000/api/rooms/change_room",
                    { roomID, tenantID }
                )

                if (request.status === 200) {
                    Toast.fire({
                        icon: "success",
                        title: "Room has been changed",
                        text: `You've successfully changed ${name}'s room `
                    })
                    onSuccess();
                }
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Failed to change room",
                text: "Network error or server is down"
            })
        } finally {
            setLoading(false);
        }
    }

    return { loading2, handleSubmit }
}

