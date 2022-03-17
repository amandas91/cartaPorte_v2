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
                id: "sample",
                title: "HOME",
                translate: "NAV.APP.HOME",
                type: "item",
                icon: "home",
                url: "/home",
                roles: [Authority.LEISURE, Authority.LEISURE_DMC,]
                // badge    : {
                //     title    : '25',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
            // {
            //     id: "trips",
            //     title: "TRIPS",
            //     translate: "NAV.APP.TRIPS",
            //     type: "item",
            //     icon: "card_travel",
            //     url: "/trips",
            // },
            {
                id: "generar_carta",
                title: "Generar Carta / CFDI Traslado",
                translate: "NAV.APP.GENERAR_CARTA",
                type: "item",
                icon: "post_add",
                url: "/generar-carta",
                roles: ALL_ROLES
            },
            
            {
                id: "monitor_carta",
                title: "Monitor Carta Porte",
                translate: "NAV.APP.MONITOR",
                type: "item",
                icon: "find_in_page",
                url: "/monitor-carta",
                roles: ALL_ROLES
            },
            
        
           
            
            
        ],
    },
];
