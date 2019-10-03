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
        viewCart: "view cart"
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
        viewCart: "ver carro"
    }
})

// strings.setLanguage('es')

export default strings