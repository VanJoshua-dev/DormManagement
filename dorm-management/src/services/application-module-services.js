import React, { useState, useEffect } from "react";
import axios from "axios"
import Swal from "sweetalert2"



export default function useFetchApplication(params = {}) {
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);

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

    const fetchAllApplications = async () => {

        try {
            const request = await axios.get(`http://localhost:3000/api/application/?search=${params.search}&status=${params.status}&date=${params.applied_date}`)
            setApplications(request.data.applications);
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
        fetchAllApplications();
    }, [JSON.stringify(params)]);

    return { loading, applications }
}


export const useSubmitApplication = ({ studentID, firstName, lastName, gender, yearLevel, email, contactNumber }) => {
    const [loading, setLoading] = useState(false);
    const [access, setAccess] = useState("");

    console.log(studentID, firstName, lastName, gender, yearLevel, email, contactNumber);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)


        try {
            const request = await axios.post("http://localhost:3000/api/application/new_application", {
                student_id: studentID,
                first_name: firstName,
                last_name: lastName,
                gender,
                year_level: yearLevel,
                email: email,
                contact_number: contactNumber
            })

            if (request.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Application Submitted",
                    text: "Your application has been submitted successfully. Please proceed to the registrar for payment and confirmation to complete the approval process.",
                    allowOutsideClick: false,
                    showConfirmButton: true,
                    confirmButtonText: "Understood",
                    confirmButtonColor: "#2196F3"
                });
            }

            if (request.status === 409) {
                Swal.fire({
                    icon: "error",
                    title: "Duplication Application",
                    text: "You've already submitted an application",
                    allowOutsideClick: false,
                    showConfirmButton: true,
                    confirmButtonText: "Understood",
                    confirmButtonColor: "#2196F3",
                    footer: "You can only submit a new application if the previous one was rejected."
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to submit application",
                text: "Network error or server is down",
                allowOutsideClick: false
            })
        } finally {
            setLoading(false)
        }
    }

    const checkAccess = async () => {
        try {
            const request = await axios.get("http://localhost:3000/api/application/application_access");
            setAccess(request.data.isOpen[0].isOpen)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Opss...",
                text: "Something went wrong",
                allowOutsideClick: false
            })
        }
    }

    useEffect(() => {
        checkAccess();
    }, [])


    return { loading, access, handleSubmit }
}

export const useUpdateApplicationAccess = () => {
    const [loading, setLoading] = useState(false);
    const [access, setAccess] = useState("");

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

    const updateAccess = async (newStatus) => {

        const result = await Swal.fire({
            icon: "question",
            title: "Are you sure?",
            text: `You are about to ${newStatus ? "OPEN" : "CLOSE"} dormitory application form.`,
            allowOutsideClick: false,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: `Yes`,
            cancelButtonText: "No"
        })

        if (result.isConfirmed) {
            try {
                setLoading(true);

                const req = await axios.post(
                    "http://localhost:3000/api/application/update_access",
                    { status: newStatus }
                );

                if (req.status === 200) {
                    setAccess(newStatus);

                    Toast.fire({
                        icon: "success",
                        title: "Application access updated",
                        text: `Application form is now ${newStatus ? "OPEN" : "CLOSED"}.`,
                    });
                }
            } catch (error) {
                Toast.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Network error or service is down",
                });
            } finally {
                setLoading(false);
            }
        }



    };

    const checkAccess = async () => {
        try {
            const request = await axios.get(
                "http://localhost:3000/api/application/application_access"
            );

            // EXPECTING BOOLEAN
            setAccess(Boolean(request.data.isOpen[0].isOpen));
        } catch {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong",
            });
        }
    };

    useEffect(() => {
        checkAccess();
    }, []);

    return { loading, access, updateAccess };
};


export const useApproveApplication = () => {
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


    const handleApprove = async (name, application_id, gender) => {


        const result = await Swal.fire({
            icon: "question",
            title: "Are you sure?",
            text: `You're about to approve ${name}'s application`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: "#2196F3",
            confirmButtonText: "Approved",
            cancelButtonText: "Cancel",
            cancelButtonColor: "#9E9E9E"
        })

        if (result.isConfirmed) {
            setLoading(true)
            try {
                const request = await axios.post("http://localhost:3000/api/application/auto_assign", {
                    name,
                    application_id,
                    gender
                })

                if (request.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Application Approved",
                        text: request.data?.message,
                        allowOutsideClick: false,
                        draggable: false,
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#2196F3"
                    })
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Failed to submit application",
                    text: "Network error or server is down",
                    allowOutsideClick: false
                })
                console.error(error);

            } finally {
                setLoading(false)
            }
        }


    }

    return { loading, handleApprove };
}


export const useRejectApplication = () => {
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


    const handleReject = async (name, application_id) => {


        const result = await Swal.fire({
            icon: "question",
            title: "Are you sure?",
            text: `You're about to reject ${name}'s application`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: "#F44336",
            confirmButtonText: "Reject",
            cancelButtonText: "Cancel",
            cancelButtonColor: "#9E9E9E"
        })

        if (result.isConfirmed) {
            setLoading(true)
            try {
                const request = await axios.patch("http://localhost:3000/api/application/reject_application", {
                    status: "Rejected",
                    applicationID: application_id,
                })

                if (request.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Application Rejected",
                        text: `${name}s application has been rejected`,
                        allowOutsideClick: false,
                        draggable: false,
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#2196F3"
                    })
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Failed to submit application",
                    text: "Network error or server is down",
                    allowOutsideClick: false
                })
                console.error(error);

            } finally {
                setLoading(false)
            }
        }


    }

    return { loading1, handleReject };
}
