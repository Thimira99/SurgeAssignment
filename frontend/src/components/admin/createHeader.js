export const createHeader = () => {
    const token = localStorage.getItem('Token');

    if (token) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
    } else return null;
}
