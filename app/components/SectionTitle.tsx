interface SectionTitleProps {
  title: string;
}
function SectionTitle({ title }: SectionTitleProps) {
  return <p className="md:text-3xl text-2xl neon-text ">{title}</p>;
}

export default SectionTitle;
