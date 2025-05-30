import { randomUUID } from "node:crypto"

type ServiceProps = {
    barberId: string
    name: string
    price: number
}

export class Service{
    public readonly id: string

    public barberId: string
    public name: string
    public price: number

    constructor({ barberId, name, price }: ServiceProps, id?: string){
        this.id = id ?? randomUUID()
        this.barberId = barberId
        this.name = name
        this.price = price
    }
}