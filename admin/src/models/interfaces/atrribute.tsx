export interface IAttributeType{
    id:number | string
    name:string
}

export interface IAttributeValue{
    id:number | string
    attributeType:IAttributeType
    name:string
    value:string | null
    status:number
    createdAt:string
    updateAt:string
}