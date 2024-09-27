export const formatNumber = (precio) => {
    const myObj = {
        style: 'currency',
        currency: 'CLP',
    }
    return precio.toLocaleString("es-CL", myObj);
}