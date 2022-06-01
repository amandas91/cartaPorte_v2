import { FuseNavigation } from "@fuse/types";
import { ALL_ROLES, Authority } from "app/shared/constant/authority.constants";

export const navigation: FuseNavigation[] = [
    {
        id: "applications",
        title: "Aplicaciones",
        translate: "NAV.APPLICATIONS",
        type: "group",
        children: [
            
            {
                id: "generar_carta",
                title: "Generar Carta / CFDI Traslado",
                translate: "NAV.APP.GENERAR_CARTA",
                type: "item",
                icon: "post_add",
                url: "/generar-carta",
                //roles: ALL_ROLES
                roles: [Authority.ROLE_ADMIN, Authority.ROLE_USER]
            },
            
            {
                id: "monitor_carta",
                title: "Monitor Carta Porte",
                translate: "NAV.APP.MONITOR",
                type: "item",
                icon: "find_in_page",
                url: "/monitor-carta",
                roles: ALL_ROLES
                //roles:  [Authority.ROLE_ADMIN, Authority.ROLE_USER, Authority.ROLE_ADC]
            },
            {
                id: "importar_excel",
                title: "Importar Excel",
                translate: "NAV.APP.IMPORTAR_EXCEL",
                type: "item",
                icon: "import_export",
                url: "/importar-excel/excel",
                roles:  [Authority.ROLE_ADMIN, Authority.ROLE_ADC]
            },
            {
                id: "administation",
                title: "ADMINISTRACIÓN",
                translate: "NAV.APP.ADMINISTRATION.TITLE",
                type: "collapsable",
                roles: [Authority.ROLE_ADMIN],
                children: [
                    {
                        id: "clients",
                        title: "Usuarios",
                        translate: "NAV.APP.CLIENTS",
                        type: "item",
                        icon: "people",
                        url: "/users",
                        // roles: [Authority.LEISURE_DMC, Authority.LEISURE]
                        roles: [Authority.ROLE_ADMIN]
                    },
                    
                   
                ]
            },
            
        
           
            
            
        ],
    },
];
