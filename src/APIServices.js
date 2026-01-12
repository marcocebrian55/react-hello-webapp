const BASE_URL = "https://playground.4geeks.com/contact/agendas";
const USER = "marcoce";

export const getContacts = async (dispatch) => {
    const response = await fetch(`${BASE_URL}/${USER}/contacts`);

    if (!response.ok) {
        await createAgenda();
        return getContacts(dispatch);
    }

    const data = await response.json();

    dispatch({
        type: "SET_CONTACTS",
        payload: data.contacts,
    });

    return data.contacts;
};

const createAgenda = async () => {
    const response = await fetch(`${BASE_URL}/${USER}`, {
        method: "POST",
    });

    console.log("Agenda creada", response);
};

export const createContact = async (dispatch, contact) => {
    const response = await fetch(`${BASE_URL}/${USER}/contacts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
    });

    if (!response.ok) {
        alert("Error al crear contacto");
        return;
    }

    const data = await response.json();

    dispatch({
        type: "add_contact",
        payload: data,
    });
};

export const editContact = async (contact) => {
    const response = await fetch(
        `${BASE_URL}/${USER}/contacts/${contact.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
        }
    );

    if (!response.ok) {
        throw new Error("Error al editar contacto");
    }

    return await response.json();
};

export const deleteContact = async (id) => {
    const response = await fetch(`${BASE_URL}/${USER}/contacts/${id}`, {
        method: "DELETE",
       
    });

    if (!response.ok) {
        throw new Error("Error al eliminar");
    }

    return true;
};
