import LocalizedStrings from 'localized-strings';

const strings = new LocalizedStrings({
    en: {
        cart: "cart",
        viewer: "viewer",
        filterBy: "filter by",
        firstName: "first name",
        lastName: "last name",
        search: "search",
        count: "count",
        noItemsFound: "no {0}s",
        actions: {
            found: "found",
            view: "view"
        },
        viewCart: "$ref{actions.view} $ref{cart}",
        noFirstName: "No first name",
        noLastName: "No last name",
        noFilter: "no filter",
        filtered: "filtered",
        none: "none",
        noName: "no name",
        provider: "provider",
        providers: "providers",
        users: "users",
        home: "home",
        settings: "settings",
        refresh: "refresh",
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
        none: "ninguno",
        noName: "sin nombre",
        provider: "proveedor",
        providers: "proveedores",
        users: "usuarios",
        home: "home",
        settings: "ajustes",
        refresh: "refrescar",
    }
})

// strings.setLanguage('es')

export default strings