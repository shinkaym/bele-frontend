import { IImage } from "../interfaces/image";
import { IOptions } from "../interfaces/options";

export const imageData:IImage[] = [
    {
        id:1,
        imageType:'main-logo',
        name:'Main logo',
        url:'http://localhost:5173/src/assets/images/logo/logo.png',
        status:1,
        deleted:0,
        createdAt:'2023-01-15T00:00:00Z'
    },
    {
        id:2,
        imageType:'product',
        name:'Shirt',
        url:'http://localhost:5173/src/assets/images/product/shirt.webp',
        status:1,
        deleted:0,
        createdAt:'2023-01-15T00:00:00Z'
    }
]

export const imageOption:IOptions[] = [
    {
        value:'',
        label:'---Select Image Type---'
    },
    {
        value:'main-logo',
        label:'Main Logo'
    },
    {
        value:'product',
        label:'Product'
    }
]