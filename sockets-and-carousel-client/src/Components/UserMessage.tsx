type Props = {
  children: React.ReactNode;
  selfMessage?: boolean;
};

export default function UserMessage({
  children,
  selfMessage = true,
}: Props): JSX.Element {
  return (
    <div className="flex flex-row items-end">
      <div
        className="w-6 h-6 -mr-5 rounded-full z-20"
        style={{ backgroundColor: `${selfMessage ? "#B9D7FB" : "#E2EAF1"}` }}
      ></div>
      <div className="w-6 h-6 -mr-3 rounded-full bg-[#f1f3f5] z-10"></div>
      <div
        className="w-3 h-3"
        style={{ backgroundColor: `${selfMessage ? "#B9D7FB" : "#E2EAF1"}` }}
      />
      <div
        className="user-message"
        style={{ backgroundColor: `${selfMessage ? "#B9D7FB" : "#E2EAF1"}` }}
      >
        {children}
      </div>
    </div>
  );
}
