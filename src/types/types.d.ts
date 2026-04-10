declare module "my-types" {
  export interface Category {
    id: number;
    name: string;
  }

  export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    categoryId: number;
    category: Category;
  }

  export interface NewProductInput {
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    categoryId: number;
  }
}

/*
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
*/