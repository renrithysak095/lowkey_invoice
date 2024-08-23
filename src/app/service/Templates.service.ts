import xhttpClient from "../utils/xhttpClient"

export const saveTemplateService = (request: object, type: string, time: string) => {
    const response = xhttpClient.post(`/templates?type=${type}&limit=${time}`, request,);
    return response;
}
export const getInvoiceTypelsService = (option: string) => {
    const response = xhttpClient.get(`/templates/ls/${option}`);
    return response;
}

export const getTemplateType = () => {
    const response = xhttpClient.get('/templates/ls/types');
    return response;
}

export const getTemplatePreview = (creatorId: any, orgId: any, type: any) => {
    const response = xhttpClient.get(`/templates/a/type/${creatorId}/${orgId}?type=${type}`);
    return response;
}

export const getTemplateDocs = (id: any) => {
    const response = xhttpClient.get(`/templates/docs//${id}`);
    return response;
}

export const fillTemplateService = (form:any) => {
    const response = xhttpClient.post(`/templates/get`,form);
    return response;
}
