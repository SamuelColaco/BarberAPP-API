
export class AppointmentResponseDTO{
    constructor(
        public id: string,
        public barberId: string,
        public barberName: string,
        public clientId: string,
        public serviceId: string,
        public serviceName: string,
        public date: Date,
        public hour: string,
        public status: string
    ){}
}