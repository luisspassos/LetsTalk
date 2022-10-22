type CategoryTitleProps = {
  text: string;
};

export function CategoryTitle({ text }: CategoryTitleProps) {
  return <h1>{text}</h1>;
}
