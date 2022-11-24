interface ClassNamesProps {
  [key: string]: boolean;
}
export default function classNames(props: ClassNamesProps) {
  return Object.keys(props)
    .filter((key) => props[key])
    .join(" ");
}
