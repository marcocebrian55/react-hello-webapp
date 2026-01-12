import React from "react";
import { Link } from "react-router-dom";
import { deleteContact } from "../APIServices";
import useGlobalReducer from "../hooks/useGlobalReducer";

const ContactCard = ({ contact}) => {
    const { dispatch } = useGlobalReducer()

    const handleDelete = () =>{
        deleteContact(contact.id)
        dispatch({
            type: "DELETE_CONTACT",
            payload : contact.id

        });
    };



    return (
        <div className="card shadow-sm mb-4 border-0">
            <div className="row g-0">

                <div className="col-4 col-md-3 d-flex align-items-center justify-content-center bg-light">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="img-fluid rounded-circle p-3"
                        alt="Foto de Contacto"
                        style={{ maxHeight: "150px", objectFit: "cover" }}
                    />
                </div>


                <div className="col-8 col-md-9">
                    <div className="card-body py-4">
                        <h4 className="card-title mb-3 text-primary">
                            {contact.name}
                        </h4>

                        <div className="mb-2">
                            <i className="fas fa-phone me-3 text-muted"></i>
                            <span className="text-secondary">{contact.phone}</span>
                        </div>

                        <div className="mb-2">
                            <i className="fas fa-envelope me-3 text-muted"></i>
                            <span className="text-secondary">{contact.email}</span>
                        </div>

                        <div className="mb-2">
                            <i className="fas fa-map-marker-alt me-3 text-muted"></i>
                            <span className="text-secondary">{contact.address}</span>
                        </div>
                        <div className="mt-3">
                            <Link
                                to={`/edit/${contact.id}`}
                                className="btn btn-primary btn-sm"
                            >
                                Editar
                            </Link>
                        </div>
                        <div className="mt-3">


                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target={`#deleteModal${contact.id}`}
                            >
                                Eliminar
                            </button>


                            <div className="modal fade" id={`deleteModal${contact.id}`} tabIndex="-1">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Confirmar eliminación</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                        </div>
                                        <div className="modal-body">
                                            ¿Seguro que quieres eliminar a <strong>{contact.name}</strong>?
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                className="btn btn-danger btn-sm ms-2"
                                                data-bs-dismiss="modal"
                                                onClick={handleDelete}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;


