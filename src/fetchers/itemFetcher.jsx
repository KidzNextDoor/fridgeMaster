import axios from 'axios'

export const postFood = async (type, expDate2, itemName, category) => {
    try {
        const email = localStorage.getItem('email')
        const res = await axios.post('/api/inventory', { type: type, expDate: expDate2, item: itemName, email, category: category });
        return res.data;
      } catch (err) {
        console.log(err);
      }
}

//localStorage.getItem(email)