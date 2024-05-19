import UserMessage from "./UserMessage";
import ChatInput from "./ChatInput";
import useStore from "../store";

// Чат на главной странице
export default function HomeChat(): JSX.Element {
  const [users, messages, assignedManagerID, currentUserID] = useStore(
    (state) => [
      state.users,
      state.messages,
      state.assignedManagerID,
      state.currentUserID,
    ]
  );

  const sortedMessages = [...messages].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  const currentMessages = [...sortedMessages].filter(
    (message) =>
      message.senderId === currentUserID ||
      message.senderId === assignedManagerID
  );

  return (
    <section className="home-chat-container">
      <h2 className="sticky top-0 h-[56px] text-xl font-semibold p-4 bg-white">
        Чат с поддержкой
      </h2>
      <div className="user-message-container user-message-container-home">
        {currentMessages.length === 0 ? (
          <p className="placeholder-message">Нет сообщений</p>
        ) : (
          <>
            {currentMessages.map((message) => {
              const user = users.find((item) => item.id === message.senderId)!;

              console.log("user", user);

              const { avatarURL, status } = user;

              return (
                <UserMessage
                  key={message.id}
                  selfMessage={status === "user" ? true : false}
                  avatarUrl={avatarURL}
                >
                  {message.content}
                </UserMessage>
              );
            })}
          </>
        )}
      </div>
      <ChatInput />
    </section>
  );
}
