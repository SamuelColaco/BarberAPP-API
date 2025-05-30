import { randomUUID } from "node:crypto"


type BlockedSlotProps = {
    barberId: string
    date: Date
    hour: string
    reason: string
}

export class BlockedSlot{
    public readonly id: string

    public barberId: string
    
    public date: Date
    public hour: string
    public reason: string

    constructor({ barberId, date, hour, reason }: BlockedSlotProps, id?: string){
        this.id = id ?? randomUUID()
        this.barberId = barberId
        this.date = date
        this.hour = hour
        this.reason = reason
    }
}