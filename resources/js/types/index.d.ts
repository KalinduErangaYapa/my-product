export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    image_url: string;
    status: string;
    parent_id: number;
    created_at: string;
    updated_at: string;
    collection_ids: any[];
}

export interface Product {
    [x: string]: any;
    is_featured: any;
    id: number;
    name: string;
    introduction: string;
    slug: string;
    price: number;
    description: string;
    status: string;
    category_id: number;
    brand_id: number;
    created_at: string;
    updated_at: string;
    variations: Variation[];
    images: Image[];
    base_price: number;
    cut_off_price: number;
    base_stock: number;
    collection_ids: any[];
}

export interface Image {
    id: number;
    product_id: string;
    image: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface Variation {
    id: number;
    product_id: string;
    sku: string;
    stock: string;
    image: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface Brand {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    image_url: string;
    status: string;
    category_id: number;
    created_at: string;
    updated_at: string;
}

export interface HomeHero {
    id: number;
    title: string;
    sub_title: string;
    intro: string;
    link: string;
    color: string;
    image: string;
    image_url: string;
    mobile_image: string;
    mobile_image_url: string;
    status: string;
    created_at: string;
}

export interface Reviews {
    id: number;
    name: string;
    company: string;
    rate: number;
    testimonial: string;
    image: string;
    image_url: string;
    status: string;
    created_at: string;
    updated_at: string;
    product_id: number;
}

export interface Collection {
    id: number;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
