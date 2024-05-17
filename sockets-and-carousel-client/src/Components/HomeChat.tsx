import { useRef } from "react";
import UserMessage from "./UserMessage";

export default function HomeChat(): JSX.Element {
  const currentUserMessageRef = useRef<string | null>(null);

  function handleUserInputChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;

    currentUserMessageRef.current = target.value;
  }

  return (
    <section className="home-chat-container">
      <div className="sticky top-0 min-h-[56px] text-xl font-semibold p-4 bg-white">
        Чат с поддержкой
      </div>
      <div className="m-4 flex flex-col items-end gap-2">
        <UserMessage>
          Информативное сообщение с просьбой, в две строки
        </UserMessage>
        <UserMessage>
          Информативное сообщение с просьбой, в две строки
        </UserMessage>
      </div>
      <form
        className="home-chat-input-container"
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(
            "currentUserMessageRef.current",
            currentUserMessageRef.current
          );
        }}
      >
        <input
          className="flex-1 text-[#77828C] pl-4 text-sm"
          maxLength={100}
          placeholder="Написать сообщение..."
          onChange={(e) => handleUserInputChange(e)}
        />
        <button className="h-full w-12 px-4" type="submit">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: "-3px" }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.9486 6.31623C19.0739 5.94035 18.9655 5.52595 18.6721 5.25962C18.3788 4.9933 17.9559 4.92528 17.5938 5.08619L4.92082 10.7186C3.61718 11.298 3.78221 13.1986 5.16622 13.5446L7.2927 14.0762C7.9053 14.2293 8.55425 14.0842 9.04323 13.6847L14.4913 9.23313C14.6777 9.08083 14.9248 9.32696 14.7732 9.51395L10.7598 14.4648C10.2656 15.0744 10.1736 15.9167 10.5246 16.6187L11.899 19.3675C12.4967 20.5628 14.2411 20.4388 14.6637 19.1711L18.9486 6.31623Z"
              fill="#77828C"
            />
          </svg>
        </button>
      </form>
    </section>
  );
}
