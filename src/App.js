import React, { Children, useState } from "react";
import "./index.css";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showForm, setShowForm] = useState(false);
  const [selectUser, setSelectUser] = useState(null);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }
  function handleSelectUser(user) {
    setSelectUser(user);
  }
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectUser.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectUser(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelect={handleSelectUser}
          selectUser={selectUser}
        />

        {showForm && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectUser && (
        <SplitBillForm onSplitBill={handleSplitBill} selectUser={selectUser} />
      )}
    </div>
  );
}

function FriendList({ friends, onSelect, selectUser }) {
  return (
    <ul>
      {friends.map((friend) => {
        return (
          <Friend
            friend={friend}
            key={friend.id}
            onSelect={onSelect}
            selectUser={selectUser}
          />
        );
      })}
    </ul>
  );
}

function Friend({ friend, onSelect, selectUser }) {
  const isSelected = friend.id === selectUser?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="red">
          {" "}
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance < 0 && (
        <p className="green">
          {" "}
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelect(friend)}>
        {isSelected ? "Close" : " Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const id = crypto.randomUUID();
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const newUser = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    onAddFriend(newUser);
    setImage("https://i.pravatar.cc/48");
    setName("");
  }
  return (
    <form className="form-add-friend">
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button onClick={handleSubmit}>Add</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function SplitBillForm({ selectUser, onSplitBill }) {
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
