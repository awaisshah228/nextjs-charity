import Image from "next/image";

const MyImage = ({ src, alt, width, height, sizes }:any) => {
  return (
    <Image src={src} alt={alt} width={width} height={height} sizes={sizes} />
  );
};

export default MyImage;
