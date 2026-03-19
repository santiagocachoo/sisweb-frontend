export interface Tier {
    id_tier: number
    nombre_tier: string
}

export interface EmpresaMiembro {
    id_empresa: number
    nombre: string
    datos_generales: string
    correo_electronico: string
    contacto: string
    nombre_contacto: string
    tier_id: number
    logo: string
    tier?: Tier
}