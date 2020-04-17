enum goodsCategories {
    art = "ART",
    accessories = "ACCESSORIES",
    homeware = "HOMEWARE",
    toys = "TOYS"
}

interface GoodInterface {
    _id: string,
    name: string,
    price: number,
    idSeller: string,
    description?: string,
    likes: number,
    image: string,
    status?: string,
    idOrder?: string,
    category?: string,
    photos?: string[]
    tags?: string[]
}

interface SellerInterface {
    _id: string,
    services: object,
    name: string,
    description: string,
    logo: string
}

// @ts-ignore
export {GoodInterface, SellerInterface, goodsCategories};
