import LocalizedStrings from 'react-localization'

const strings = new LocalizedStrings({
    en: {
        cart: "cart",
        viewer: "viewer",
        filterBy: "filter by",
        firstName: "first name",
        lastName: "last name",
        search: "search",
        count: "count",
        noCartsFound: "no carts found",
        found: "found",
        viewCart: "view cart",
        noFirstName: "No first name",
        noLastName: "No last name",
        noFilter: "no filter",
        filtered: "filtered",
    },
    es: {
        cart: "carro",
        viewer: "visor",
        filterBy: "filtrar por",
        firstName: "nombre",
        lastName: "apellido",
        search: "buscar",
        count: "cuenta",
        noCartsFound: `ningun carro encontrado`,
        found: "encontrado",
        viewCart: "ver carro",
        noFirstName: "sin nombre",
        noLastName: "sin apellido",
        noFilter: "sin filtro",
        filtered: "filtrado",
    }
})

// strings.setLanguage('es')

export default strings