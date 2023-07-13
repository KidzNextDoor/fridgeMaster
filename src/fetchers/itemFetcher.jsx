import axios from 'axios'

export const getUser = () => {

}

export const postFood = async () => {
    try {
        const res = await axios.post('/', { purchaseDate, type, expDate, itemName });
        return res.data;
      } catch (err) {
        console.log(err);
      }
}