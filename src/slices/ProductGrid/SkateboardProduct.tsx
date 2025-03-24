import { createClient } from '@/prismicio'
import { PrismicNextImage } from '@prismicio/next';

import { Content, isFilled } from '@prismicio/client';
import { FaStar } from 'react-icons/fa6';
import { ButtonLink } from '@/app/components/ButtonLink';
import { HorizontalLine, VerticalLine } from '@/app/components/Line';
import clsx from 'clsx';
import { Scribble } from '@/app/components/Scribble';

//breaks
// async function getDominantColor(url:string) {
//     const paleteURL = new URL(url); //get url from current page
//     paleteURL.searchParams.set("pallete", "json"); //add pallete and json
//     console.log(paleteURL);

//     const res = await fetch(paleteURL);
//     const json = await res.json();
//     console.log(json);
//     return (json.dominant_colors.vibrant?.hex || json.dominant_colors.vibrant_light?.hex);
// }

type Props = {
    id: string
}

//for sharing styles, rather than having same classes on both elements
const VERTICAL_LINE_CLASSES = "absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";
const HORIZTONAL_LINE_CLASSES = "-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

export async function SkateboardProduct({id}: Props) {

    //fetch board by id in this file (used for each board)
    const client = createClient();
    const product = await client.getByID<Content.SkateboardDocument>(id); //between <> is just a type to expect

    //price is in total pence(5999), so do a quick calc to convert it to pounds/pence
    const price = isFilled.number(product.data.price) ? `${(product.data.price / 100).toFixed(2)}` : "Price Not Availalble";
    //const dominantColor = isFilled.image(product.data.image) ? await getDominantColor(product.data.image.url) : undefined; //breaks

    return (
        <div className='group relative mx-auto w-full max-w-72 px-8 pt-4'>
            {/* just svgs */}
            <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "left-4")}/>
            <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "right-4")}/>
            <HorizontalLine className={HORIZTONAL_LINE_CLASSES}/>


            <div className='flex items-center justify-between ~text-sm/2xl'>
                <span>{price}</span>
                <span className="inline-flex items-center gap-1">
                    <FaStar className='text-yellow-400' /> 37
                </span>
            </div>

           <div className='-mb-1 overflow-hidden py-4'>
            {/* scribble is svg and hover effect (stroke-dashoffset) */}
            <Scribble color={"#f00"} className='absolute inset-0 h-full w-full'/>
            <PrismicNextImage className='mx-auto w-[58%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150' alt='' field={product.data.image} width={150}></PrismicNextImage>
           </div>

           <HorizontalLine className={HORIZTONAL_LINE_CLASSES}/>

           <h3 className='my-2 text-center font-sans leading-tight ~text-lg/xl'>{product.data.name}</h3>

           <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <ButtonLink field={product.data.customiser_link}>Customise</ButtonLink>
           </div>
        </div>
    )
}