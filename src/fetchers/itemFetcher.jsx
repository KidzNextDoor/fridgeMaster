import axios from 'axios'

export const getUser = () => {

}

export const postFood = async () => {
    try {
        const res = await axios.post('/inventory', { purchaseDate, type, expDate, itemName });
        return res.data;
      } catch (err) {
        console.log(err);
      }
}

//localStorage.getItem(email)