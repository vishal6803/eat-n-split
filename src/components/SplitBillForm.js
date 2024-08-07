import { useState } from "react";
import Button from "../Button";
export default function SplitBillForm({ selectUser, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserEXpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = bill ? bill - userExpense : "";

  const changeHandler = (e) => {
    setUserEXpense(
      Number(e.target.value) > Number(bill)
        ? Number(userExpense)
        : Number(e.target.value)
    );
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !userExpense) return;
    onSplitBill(whoIsPaying === "friend" ? userExpense : -paidByFriend);
    setBill("");
    setUserEXpense("");
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectUser.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />

      <label>🧍‍♀️ Your expense</label>
      <input type="text" value={userExpense} onChange={changeHandler} />

      <label>👫{selectUser.name}'s expense</label>
      <input type="number" disabled value={paidByFriend} />
      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectUser.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
