export const initialStore = () => ({
    contacts: []
});

const storeReducer = (store, action = {}) => {
    switch (action.type) {
        case "SET_CONTACTS":
            return {
                ...store,
                contacts: action.payload
            };

        case "ADD_CONTACTS":
            return {
                ...store,
                contacts: [...store.contacts, action.payload]
            };
        case "UPDATE_CONTACT":
            return {
                ...store,
                contacts: store.contacts.map(c =>
                    c.id === action.payload.id ? action.payload : c
                )
            };
        case "DELETE_CONTACT":
            return {
                ...store,
                contacts: store.contacts.filter(contact => contact.id !== action.payload)
            };

        default:
            return store;
    }
};

export default storeReducer;
