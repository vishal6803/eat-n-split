import Friend from "./Friend";

export default function FriendList({ friends, onSelect, selectUser }) {
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
