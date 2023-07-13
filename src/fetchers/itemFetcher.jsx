import axios from 'axios'

export const postFood = async () => {
    try {
        const email = localStorage.getItem('email')
        console.log(email)
        const res = await axios.post('/api/inventory', { purchaseDate, type, expDate, itemName, email });
        return res.data;
      } catch (err) {
        console.log(err);
      }
}

//localStorage.getItem(email)