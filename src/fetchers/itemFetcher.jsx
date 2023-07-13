import axios from 'axios'

export const postFood = async (e) => {
    try {
        const email = localStorage.getItem('email')
        console.log(email)
        const res = await axios.post('/api/inventory', { type, expDate, item: itemName, email });
        console.log(res)
        return res.data;
      } catch (err) {
        console.log(err);
      }
}

//localStorage.getItem(email)