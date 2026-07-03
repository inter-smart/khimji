import Image from 'next/image';

export default function ContentImage(props) {
  return (
    <Image 
      unoptimized 
      quality={100} 
      {...props} 
    />
  );
}
