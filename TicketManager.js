class TicketManager{

    events = [];

    #priceBase = 0.15;
    idAuto = 1;

    getEvents(){
        return this.events;
    }


    addEvents(event){

        const {price} = event;

        this.events.push({...event,
                        price: price + priceBase,
                        date: new Date(),
                        participants: [],
                        id: this.idAuto
                    });

        this.idAuto += 1;
    }

    addUser(eventId, user){
        const event = this.events.find((event) => event.id === eventId);
        
        if(!event){
            throw Error('El evento no existe');
        }

        const userExist = event.participants.find((paticipant) => paticipant.id === user.id);
        
        if(!userExist){
            event.participants.push(user);
        }
    }

    ponerEventoEnGira(eventId, newPlace, newDate){
        const event = this.events.find((event) => event.id === eventId);
        const newEvent = {...event, id: this.idAuto, place: newPlace, date: newDate };
        this.events.push(newEvent);
    }

}