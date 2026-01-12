import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard.jsx";
import  useGlobalReducer  from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { getContacts } from "../APIServices.js";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        getContacts(dispatch);
    }, [dispatch]);

   
    

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Mi Agenda de Contactos</h1>

            
            

            {store.contacts.length === 0 ? (
                <p className="text-center">No hay contactos aún</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {store.contacts.map((contact) => (
                        <div className="col" key={contact.id}>
                            <ContactCard 
                                contact={contact}
                                
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};