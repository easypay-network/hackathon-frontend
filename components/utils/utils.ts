import {Invoices} from "../types";

export default {
    capitalizeString(inputString: string) {
        if (!inputString) {
            return inputString;
        }

        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    },
    transformDescription(description: string) {
        return description.length > 70 ? description.slice(0, 70) + '...' : description;
    },
    transformInvoices(invoices: Invoices[])  {
        return invoices.map(function (invoice) {
            return {
                'product' :
                    {
                        title: invoice.title,
                        identity: invoice.identity,
                        imageUrl: invoice.imageUrl,
                    },
                'category' : {
                    name: 'Invoices',
                }
            }
        })
    },


}