import Image from "next/image";


export default function Intro() {
  return <section>
    <div className='flex items-center justify-center'>
       <div>
        <Image src="..\..\public\DRHeadshot.png" width={200} height={200} priority={true} alt="Dylan Potrait"></Image>
        </div> 
    </div>
  </section>;
}
