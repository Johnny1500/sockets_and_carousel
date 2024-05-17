import ChatInput from "../ChatInput";
import UserMessage from "../UserMessage";
import UserCard from "../UserCard";

// Страница-панель менеджера
export default function Dashboard(): JSX.Element {
  return (
    <div className="flex h-full min-w-[800px] bg-[#f1f3f5]">
      <div className="user-list">
        <UserCard
          name="Имя Фамилия"
          message="Информативное сообщение с просьбой, в две строки"
        />
        <UserCard
          name="Имя Фамилия"
          message="Информативное сообщение с просьбой, в две строки"
        />
      </div>
      <div className="block flex-1 h-full relative">
        <div className="user-message-container user-message-container-dashboard">
          <UserMessage>
            Информативное сообщение с просьбой, в две строки
          </UserMessage>
          <UserMessage selfMessage={false}>
            Информативное сообщение с просьбой, в две строки
          </UserMessage>
        </div>
        <ChatInput />
      </div>
    </div>
  );
}
