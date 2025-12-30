import React, { useState, useEffect } from "react";
import axios from "axios"
import Swal from "sweetalert2"


export function useFetchAllRooms(params = {}) {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);

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
    const fetchAllRoom = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/rooms/get_all_rooms?search=${params.search}&status=${params.status}&type=${params.type}&gender=${params.gender}`);
            setRooms(response.data.rooms);
            console.log(response.data.rooms)
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Fetch Error",
                text: error?.response?.data?.message || "Network error or service is down",
            });

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllRoom();
    }, [JSON.stringify(params)]);





    return { loading, rooms }
}

export const useCreateRoom = ({ room_number, room_type, capacity, gender }, onSuccess = () => { }) => {
    const [loading, setLoading] = useState(false);
    console.log(room_number, room_type, capacity, gender)

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
        setLoading(true);
        try {
            const request = await axios.post("http://localhost:3000/api/rooms/create_room", {
                room_number,
                room_type,
                capacity,
                gender
            })

            if (request.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "Room Added",
                    text: request.data.message || "You've successfully added a new room"
                });
                onSuccess();
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Opss...",
                text: "Network error or server is down."
            });
        } finally {
            setLoading(false);
        }
    }


    return { loading, handleSubmit };
}


export const useEditRoom = ({ room_number, room_type, capacity, gender, room_id }, onSuccess = () => { }) => {
    const [loading, setLoading] = useState(false);
    console.log(room_number, room_type, capacity, gender, room_id);
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
        setLoading(true);
        const result = await Swal.fire({
            icon: "question",
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Save",
            denyButtonText: "Cancel",
            denyButtonColor: "#BDBDBD"
        })

        if (result.isConfirmed) {
            try {
                const request = await axios.put("http://localhost:3000/api/rooms/update_room", {
                    room_number,
                    room_type,
                    capacity,
                    gender,
                    room_id
                })

                if (request.status === 200) {
                    Toast.fire({
                        icon: "success",
                        title: "Room Updated",
                        text: request.data.message || "You've successfully updated a room"
                    });
                    onSuccess();
                }
            } catch (error) {
                Toast.fire({
                    icon: "error",
                    title: "Opss...",
                    text: "Network error or server is down."
                });
            } finally {
                setLoading(false)
            }
        } else if (result.isDenied) {
            Swal.fire("Room changes are not saved", "", "info");
            onSuccess();
        }



    }

    return { loading, handleSubmit }
}

export const useChangeRoomStatus = () => {
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

    const handleStatusChange = async (new_status, room_number) => {
        console.log(new_status)
        console.log(room_number)
        const result = await Swal.fire({
            icon: "question",
            title: "Are you sure?",
            text: `You are about to change the room ${room_number} to ${new_status}`,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel"
        })

        if (result.isConfirmed) {
            setLoading(true)
            try {
                const request = await axios.patch("http://localhost:3000/api/rooms/update_room_status", {
                    new_status,
                    room_number
                });

                if (request.status === 200) {
                    Toast.fire({
                        icon: "success",
                        title: "Room Status Changed",
                        text: `You've change room ${room_number} status to ${new_status}`
                    })
                }
            } catch (error) {
                Toast.fire({
                    icon: "error",
                    title: "Change status failed",
                    text: "Failed to update room status",
                })
            } finally {
                setLoading(false);
            }
        }
    }

    return { loading, handleStatusChange }

}


export const useDeleteRoom = () => {
    const [loading, setLoading] = useState(false);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        customClass: { popup: "colored-toast" },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        showClass: { popup: "animate_animated animate__fadeIn" },
        hideClass: { popup: "animate__animated animate__bounceOutRight" },
    });

    const handleDelete = async (room_id, room_number) => {
        console.log(room_id)
        const result = await Swal.fire({
            title: "Are you sure?",
            html: `
                <p>You are about to delete room <b>${room_number}</b>. This action cannot be undone.</p>
                `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    setLoading(true);

                    const res = await axios.delete(
                        `http://localhost:3000/api/rooms/delete_room/${room_id}`
                    );

                    if (res.status !== 200) {
                        throw new Error("Delete failed");
                    }

                    return true;
                } catch (err) {
                    Swal.showValidationMessage("Network error or server is down.");
                    return false;
                }
            }
        });

        setLoading(false);

        if (result.isConfirmed && result.value === true) {
            Toast.fire({
                icon: "success",
                title: "Deleted",
                text: `You've deleted room ${room_number}`
            });
        }
    };

    return { handleDelete };
};

export const useViewRoster = (roomNumber) => {

    const [loading, setLoading] = useState(false);
    const [roster, setRoster] = useState([]);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        customClass: { popup: "colored-toast" },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
    });

    const viewRoster = async () => {
        if (!roomNumber) return;

        try {
            setLoading(true);

            const { data } = await axios.get(
                `http://localhost:3000/api/rooms/room_roster/${roomNumber}`
            );

            setRoster(data.roster || []);
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Oops...",
                text: "Network error or server is down",
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        viewRoster();
    }, [roomNumber]);

    return {
        loading,
        roster,
    };
};

