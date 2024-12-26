
export interface Product {
    _id?: string;
    name: string;
    desc: string;
    price: number;
    stock: number;
    mrp: number;
    // images: File;
    hero: FileList | string;
    active?: boolean;
}

export interface ProductResponse {
    products: Product[];
}
