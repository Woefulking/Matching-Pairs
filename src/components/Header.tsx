interface HeaderProps {
  value: string;
}
export const Header = ({ value }: HeaderProps) => {
  return (
    <h1
      className={`text-center text-3xl font-bold tracking-wide text-white md:text-5xl lg:text-6xl xl:text-[86px]`}
    >
      {value}
    </h1>
  );
};
