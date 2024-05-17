type Props = {
  children: React.ReactNode;
  selfMessage?: boolean;
};

export default function UserMessage({
  children,
  selfMessage = true,
}: Props): JSX.Element {
  return (
    <div className="relative">
      <div />
      <div className="flex flex-row items-end">
        <div
          className="w-4 h-4"
          style={{ backgroundColor: `${selfMessage ? "#B9D7FB" : "#E2EAF1"}` }}
        ></div>
        <div
          className="user-message"
          style={{ backgroundColor: `${selfMessage ? "#B9D7FB" : "#E2EAF1"}` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
