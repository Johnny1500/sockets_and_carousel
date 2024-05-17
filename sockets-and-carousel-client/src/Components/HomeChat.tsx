import UserMessage from "./UserMessage";
import ChatInput from "./ChatInput";

// Чат на главной странице
export default function HomeChat(): JSX.Element {
  return (
    <section className="home-chat-container">
      <h2 className="sticky top-0 h-[56px] text-xl font-semibold p-4 bg-white">
        Чат с поддержкой
      </h2>
      <div className="user-message-container user-message-container-home">
        <UserMessage>
          Информативное сообщение с просьбой, в две строки
        </UserMessage>
        <UserMessage selfMessage={false}>
          Информативное сообщение с просьбой, в две строки
        </UserMessage>
      </div>
      <ChatInput />
    </section>
  );
}
