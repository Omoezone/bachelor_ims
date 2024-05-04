export interface ItemsBase {
    name: string;
    price: number;
    amount: number;
    type: string;
    width: number;
    height: number;
    color: string;
}

export interface Items extends ItemsBase {
    itemId: number;
    collectionId: number;
}