type Props = {
  name: string;
  message: string;
  avatarUrl: string;
  id: string;
  current: boolean;
};

// Карточка пользователя на панели менеджера
export default function UserCard({
  name,
  message,
  avatarUrl,
  id,
  current = false,
}: Props): JSX.Element {
  return (
    <div
      className="user-card"
      id={id}
      style={{ backgroundColor: current ? "#b9d7fb" : "#f2f2f2" }}
    >
      <div
        className="bg-[#f2f2f2] rounded-full min-w-10 h-10"
        style={{ backgroundImage: avatarUrl }}
      />
      <div className="block">
        <p className="font-semibold mb-0.5 text-sm">{name}</p>
        <p className="truncate ... max-w-[288px] text-sm">{message}</p>
      </div>
    </div>
  );
}
