import { useState } from "react";
import ChatInput from "../ChatInput";
import UserMessage from "../UserMessage";
import UserCard from "../UserCard";
import useStore from "../../store";

// Страница-панель менеджера
export default function Dashboard(): JSX.Element {
  const [users, messages, assignedManagerID, currentUserID] = useStore(
    (state) => [
      state.users,
      state.messages,
      state.assignedManagerID,
      state.currentUserID,
    ]
  );
  const [currentChatUserID, setCurrentChatUserID] = useState<string | null>(
    null
  );

  const sortedMessages = [...messages].sort(
    (a, b) => b.timestamp - a.timestamp
  );
  const usersIdsWithMessages = Array.from(
    new Set([...sortedMessages].map((message) => message.senderId))
  );

  const usersWithLastMessage = usersIdsWithMessages.map((id) => {
    const lastMessage = sortedMessages.find(
      (message) => message.senderId === id
    );

    return [id, lastMessage?.content];
  });

  const currentMessages = [...sortedMessages].filter(
    (message) =>
      message.senderId === currentChatUserID ||
      message.senderId === assignedManagerID
  );

  console.log("usersWithLastMessage === ", usersWithLastMessage);

  function handleUserListClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    const userBlock = target.closest("div");

    console.log("userBlock === ", userBlock);
    console.log("userBlock.id === ", userBlock.id);

    if (!userBlock || userBlock.id) return;

    setCurrentChatUserID(userBlock.id);
  }

  return (
    <div className="flex h-full min-w-[800px] bg-[#f1f3f5]">
      {assignedManagerID !== currentUserID ? (
        <p className="font-semibold">
          Менеджером, который может общаться со всеми пользователями,
          назначается только первое открытое окно
        </p>
      ) : (
        <>
          <div className="user-list" onClick={(e) => handleUserListClick(e)}>
            {messages.length === 0 ? (
              <p>Нет активных чатов</p>
            ) : (
              usersWithLastMessage.map((userTuple) => {
                const renderUser = users.find(
                  (user) => user.id === userTuple[0]
                );

                const { id, avatarURL, name } = renderUser!;

                return (
                  <UserCard
                    key={id}
                    id={id}
                    name={name}
                    message={userTuple[1]!}
                    avatarUrl={avatarURL}
                    current={id === currentChatUserID ? true : false}
                  />
                );
              })
            )}
          </div>
          <div className="block flex-1 h-full relative">
            <div className="user-message-container user-message-container-dashboard">
              {currentMessages.length === 0 ? (
                <p className="font-semibold">Нет сообщений</p>
              ) : (
                <>
                  {currentMessages.map((message) => {
                    const user = users.find(
                      (item) => item.id === message.senderId
                    )!;

                    const { avatarURL, status } = user;

                    return (
                      <UserMessage
                        selfMessage={status === "manager" ? true : false}
                        avatarUrl={avatarURL}
                      >
                        Информативное сообщение с просьбой, в две строки
                      </UserMessage>
                    );
                  })}
                </>
              )}
            </div>
            <ChatInput kindOfSender="manager" />
          </div>
        </>
      )}
    </div>
  );
}
