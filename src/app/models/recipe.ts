export interface Recipe{
    id: number;
    name: string;
    preparation: string;
    preparationTime: number;
    bakingTime: number;
    insertionDate: Date;
    updateDate: Date;
    readCount: number;
    imageUrl: string;
    recipeWeek: boolean;
    recipeDay: boolean;
    userId: number;
    userUserName: string;
    userFirstName: string;
    userLastName: string;
    userImageUrl: string;
    categoryId: number;
    categoryName: string;
    active: boolean;
}