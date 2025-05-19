// components/Base64Image.tsx
interface Props {
  base64: string;
}

export default function Base64Image({ base64 }: Props) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={base64} alt="Ảnh base64" style={{ maxWidth: "30%", height: "auto" }} />;
}
