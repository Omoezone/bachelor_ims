export interface ItemsBase {
    name: string;
    price: number;
    amount: number;
    type: string;
    width: number;
    height: number;
    color: string;
    collectionId: number;
}

export interface Items extends ItemsBase {
    itemId: number;
    collectionId: number;
}