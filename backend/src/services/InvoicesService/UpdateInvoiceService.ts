import AppError from "../../errors/AppError";
import Invoice from "../../models/Invoices";
import Plan from "../../models/Plan";

interface InvoiceData {
  status: string;
  id?: number | string;
}

interface InvoiceCreate {
  companyId: number;
  planId: number;
  dueDate: string;
  stat: string;
}

const UpdateInvoiceService = async (
  InvoiceData: InvoiceData
): Promise<Invoice> => {
  const { id, status } = InvoiceData;

  const invoice = await Invoice.findByPk(id);

  if (!invoice) {
    throw new AppError("ERR_NO_PLAN_FOUND", 404);
  }

  await invoice.update({
    status
  });

  return invoice;
};

export const CreateInvoiceService = async (
  InvoiceData: InvoiceCreate
): Promise<Invoice> => {
  // detail: string;
  // status: string;
  // value: number;
  // createdAt: Date;
  // updatedAt: Date;
  // dueDate: string;
  // companyId: number;
  const plan = await Plan.findByPk(InvoiceData.planId);
  const inv = {
    detail: plan.name,
    status: InvoiceData.stat,
    value: plan.value,
    createdAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
    dueDate: InvoiceData.dueDate,
    companyId: InvoiceData.companyId
  };
  const invoice = await Invoice.create(inv);

  return invoice;
};

export default UpdateInvoiceService;
