import React from "react";
import logo from "./logo.png";

function Dashboard() {
  return <div>You are logged in</div>;
}

export default Dashboard;

return (
  <div className="">
    <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    <button>
      <img src={expiringSoon} alt="expiringSoon" />
    </button>
    <button>
      <img src={spoiled} alt="spoiled" />
    </button>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add an item:</h2>
      <label className="inputLabels" htmlFor="purchaseDate">
        Purchase date:
      </label>
      <label className="inputLabels" htmlFor="type">
        Type:
      </label>
      <label className="inputLabels" id="expDate">
        Expiration date:
      </label>
      <label className="inputLabels" id="itemName">
        Name:
      </label>
      <input
        className="inputField"
        id="purchaseDate"
        type="date"
        onInput={(e) => purchaseDateHandler(e.target.value)}
        defaultValue={purchaseDate}
        placeholder="purchaseDate"
        {...register("purchaseDate")}
      />
      <select
        className="inputField"
        id="type"
        onInput={(e) => daysToSpoilHandler(e.target.value)}
        placeholder="Type:"
        {...register("type")}
      >
        <option>Select an option</option>
        {typesArray.map((el) => (
          <option value={el}>{el}</option>
        ))}
      </select>
      <input
        className="inputField"
        id="expDate"
        type="date"
        placeholder="expDate"
        value={expDate2}
        {...register("expDate")}
      />
      <input
        className="inputField"
        id="itemName"
        type="text"
        placeholder="itemName"
        {...register("itemName")}
      />
      {/* <label htmlFor="purchaseDate">Date Purchased:</label> */}
      {/* <input className="input" value={purchaseDate} type='date' placeholder="Date Purchased" id="purchaseDate" name="purchaseDate"/> */}
      {/* <label htmlFor='type'>Type:</label> */}
      {/* <input className='input' type='dropdown' name='type' id='type' placeholder='Enter Type'/> */}
      {/* <label htmlFor='expDate'>Expiration date:</label> */}
      {/* <input className='input' type='date' placeholder="Expiration Date" id="expDate" name="expDate"/> */}
      {/* <label htmlFor='itemName'>Name:</label> */}
      {/* <input className='input' type='text' placeholder='Item Name' id='itemName'name='itemName'/> */}
      <input type="submit" />
    </form>
    <Contents />
  </div>
);
