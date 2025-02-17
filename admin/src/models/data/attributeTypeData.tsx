import { IAttributeType, IAttributeValue } from "../interfaces/attribute";
import { IOptions } from "../interfaces/options";

export const attributeTypeOptions:IOptions[] = [
    {
        value:0,
        label:'---Select Attribute Type---'
    },
    {
        value:1,
        label:'Color'
    },
    {
        value:2,
        label:'Size'
    },
]

export const attributeTypeData:IAttributeType[] = [
    {
        id:1,
        name:'Color'
    },{
        
        id:2,
        name:'Size'
    }
]

export const attributeValueData: IAttributeValue[] = [
  {
    id: 1,
    attributeType: { id: 1, name: 'Color' },
    name: 'Red',
    value: '#FF0000',
    status: 1,
    createdAt: '2024-01-01T12:00:00Z',
    updateAt: '2024-01-01T12:00:00Z',
  },
  {
    id: 2,
    attributeType: { id: 1, name: 'Color' },
    name: 'Blue',
    value: '#0000FF',
    status: 1,
    createdAt: '2024-01-02T12:00:00Z',
    updateAt: '2024-01-02T12:00:00Z',
  },
  {
    id: 3,
    attributeType: { id: 2, name: 'Size' },
    name: 'S',
    value: '',
    status: 1,
    createdAt: '2024-01-03T12:00:00Z',
    updateAt: '2024-01-03T12:00:00Z',
  },
  {
    id: 4,
    attributeType: { id: 2, name: 'Size' },
    name: 'M',
    value: '',
    status: 0,
    createdAt: '2024-01-04T12:00:00Z',
    updateAt: '2024-01-04T12:00:00Z',
  },
];
