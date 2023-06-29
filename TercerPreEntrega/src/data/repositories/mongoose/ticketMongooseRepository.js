import ticketSchema from "../../models/mongoose/ticketSchema.js";
import Ticket from "../../../domine/entities/ticket.js"

class TicketMongooseRepository
{
  async paginate(criteria)
  {
    const { limit, page } = criteria;
    const ticketDocuments = await ticketSchema.paginate({}, { limit, page });
    const { docs, ...pagination } = ticketDocuments;

    const tickets = docs.map(document => new Ticket(
      document._id,
      document.code,
      document.purchase_datetime,
      document.amount,
      document.purchaser
    ));

    return {
        tickets,
        pagination
    };
  }

  async create(data)
  {
    const document = await ticketSchema.create(data);

    return new Ticket(
        document._id,
        document.code,
        document.purchase_datetime,
        document.amount,
        document.purchaser
    );
  }

}

export default TicketMongooseRepository;
