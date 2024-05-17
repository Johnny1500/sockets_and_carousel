type Props = {
  name: string;
  message: string;
};

// Карточка пользователя на панели менеджера
export default function UserCard({ name, message }: Props): JSX.Element {
  return (
    <div className="user-card">
      <div className="bg-[#F2F2F2] rounded-full min-w-10 h-10"></div>
      <div className="block">
        <p className="font-semibold mb-0.5 text-sm">{name}</p>
        <p className="truncate ... max-w-[288px] text-sm">{message}</p>
      </div>
    </div>
  );
}
