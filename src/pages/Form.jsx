import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact, editContact } from "../APIServices";

export const Form = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
  
    const [contact, setContact] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const [showAlert, setShowAlert] = useState(false);
    const [isEditing,setIsEditing]=useState(false);

    const handleInputsChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!contact.name || !contact.phone || !contact.email || !contact.address) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            return;
        }

        if(isEditing){
            await editContact(contact);
        } else {
            await createContact(dispatch, contact);
        }

        navigate("/");
    };

    const contactToEdit = () => {
        const contactFinded = store.contacts.find(contact => {
            return contact.id === Number(id);
        });

        
        if (contactFinded) {
            setContact(contactFinded);
        }
    };

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            contactToEdit();
        } else {
            setIsEditing(false);
        }
    }, [id, store.contacts]);

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-success text-white text-center">
                    <h3>{id ? "Editar Contacto" : "Añadir Nuevo Contacto"}</h3>
                </div>

                <div className="card-body">
                    {showAlert && (
                        <div className="alert alert-warning" role="alert">
                            Todos los campos son obligatorios
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Nombre completo"
                                value={contact.name}
                                onChange={handleInputsChange}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="tel"
                                name="phone"
                                className="form-control"
                                placeholder="Teléfono"
                                value={contact.phone}
                                onChange={handleInputsChange}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                value={contact.email}
                                onChange={handleInputsChange}
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                placeholder="Dirección"
                                value={contact.address}
                                onChange={handleInputsChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-success btn-lg w-100">
                            Guardar contacto
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
