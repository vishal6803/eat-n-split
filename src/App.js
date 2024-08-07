import React, { useState } from "react";
import "./index.css";
import FriendList from "./components/FriendList";
import Button from "./components/Button";
import SplitBillForm from "./components/SplitBillForm";
import FormAddFriend from "./components/FormAddFriend";
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
        <SplitBillForm
          key={selectUser.id}
          onSplitBill={handleSplitBill}
          selectUser={selectUser}
        />
      )}
    </div>
  );
}
