
interface GoodInterface {
    _id: string,
    name: string,
    price: number,
    idCategory?: string,
    idSeller: string
    description?: string,
    likes: number,
    image: string
}

interface SellerInterface {
    _id: string,
    services: object,
    name: string,
    description: string,
    logo: string
}

// @ts-ignore
export {GoodInterface, SellerInterface};
