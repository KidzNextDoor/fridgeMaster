// This component will render items between 0 and 5 days from expiration.

import React, { Component, useState } from "react";
import axios from "axios";
import moment from "moment";

export default function ExpiringSoon() {
  const email = localStorage.getItem("email");
  const [expiringItems, setExpiringItems] = useState([]);

  axios("/api/inventory", {params: {email: 'alroro@fw.com' }}).then((data) => {
    console.log(data)
    const expItems = [];
    // data.forEach((element) => {
    //   if (moment(element.expDate).isBetween(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD').add(5, "d")));
    //     expItems.push(element);
    // });
    // setExpiringItems(expItems);
  });

  return <div>ExpiringSoon</div>;
}
