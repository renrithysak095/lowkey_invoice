import xhttpClient from "../utils/xhttpClient"

export const getElementsKeyService = () => {
    const response = xhttpClient.get('/elements');
    return response;
}
export const modifyElementsKeyService = (key_id: string, req: object) => {
    const response = xhttpClient.put(`/elements/${key_id}`, req);
    return response;
}
export const removeElementsKeyService = (key_id: string) => {
    const response = xhttpClient.delete(`/elements/${key_id}`);
    return response;
}
export const addElementsKeyService = (req: object) => {
    const response = xhttpClient.post(`/elements`, req);
    return response;
}