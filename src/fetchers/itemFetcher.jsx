import axios from 'axios'

const email = localStorage.getItem('email');

export const postFood = async ({ type, expDate2, name }) => {
    try {
        const res = await axios.post('/api/inventory', { type, expDate: expDate2, name, email });
        return res.data;
      } catch (err) {
        console.log(err);
      }
}

export const getFood = async () => {
  try {
    const res = await axios.get(`/api/inventory/${email}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const deleteFood = async (fridgeContents) => {
  try {
    await axios.delete('api/inventory', { data: { fridgeContents, email } })
  } catch (err) {
    console.log(err);
  }
}
