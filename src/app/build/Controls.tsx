"use client";

import { ColorField, Content, ImageField, isFilled, KeyTextField } from '@prismicio/client';
import clsx from 'clsx';
import React, { ReactNode, useEffect } from 'react'
import { Heading } from '../components/Heading';
import { PrismicNextImage, PrismicNextImageProps } from '@prismicio/next';
import { useCustomiserControls } from './context';
import { useRouter } from 'next/navigation';

type Props = Pick<Content.BoardCustomiserDocumentData, "wheels" | "decks" | "metals"> & {
  className?: string
}

export default function Controls({wheels, decks, metals, className}: Props) {


  const router = useRouter();


  const {setBolt, setDeck, setTruck, setWheel, selectedBolt, selectedDeck, selectedTruck, selectedWheel} = useCustomiserControls();

  useEffect(() => {
    const url = new URL(window.location.href); //make a new url based of current url (saved in a var, doesnt do anything yet)

    if(isFilled.keyText(selectedWheel?.uid)){
      url.searchParams.set("wheel", selectedWheel.uid); //add wheel param to url
    }
    if(isFilled.keyText(selectedTruck?.uid)){
      url.searchParams.set("truck", selectedTruck.uid); //add Truck param to url
    }
    if(isFilled.keyText(selectedDeck?.uid)){
      url.searchParams.set("deck", selectedDeck.uid); //add Deck param to url
    }
    if(isFilled.keyText(selectedBolt?.uid)){
      url.searchParams.set("bolt", selectedBolt.uid); //add Bolt param to url
    }
    router.replace(url.href); //replace current url with new url we just made

  },[router, selectedWheel, selectedBolt, selectedDeck, selectedTruck])



  return (
    <div className={clsx("flex flex-col gap-6", className)}>
        <Options title="Deck" selectedName={selectedDeck?.uid}>
          {decks.map((deck) => (
            <Option onClick={()=> setDeck(deck)} key={deck.uid} imageField={deck.texture} imgixParams={{rect:[20, 1550, 1000, 1000], width:150, height:150}} selected={deck.uid === selectedDeck?.uid}>
              {deck.uid?.replace(/-/g, " ")}
            </Option>
          ))}
        </Options>
        <Options title="Wheels" selectedName={selectedWheel?.uid}>
          {wheels.map((wheel) => (
            <Option onClick={()=> setWheel(wheel)} key={wheel.uid} imageField={wheel.texture} imgixParams={{rect:[20, 10, 850, 850], width:150, height:150}} selected={wheel.uid === selectedWheel?.uid}>
              {wheel.uid?.replace(/-/g, " ")}
            </Option>
          ))}
        </Options>
        <Options title="Trucks" selectedName={selectedTruck?.uid}>
          {metals.map((metal) => (
            <Option onClick={()=> setTruck(metal)} key={metal.uid} colorField={metal.color} selected={metal.uid === selectedTruck?.uid}>
              {metal.uid?.replace(/-/g, " ")}
            </Option>
          ))}
        </Options>
        <Options title="Bolts" selectedName={selectedBolt?.uid}>
          {metals.map((metal) => (
            <Option onClick={()=> setBolt(metal)} key={metal.uid} colorField={metal.color} selected={metal.uid === selectedBolt?.uid}>
              {metal.uid?.replace(/-/g, " ")}
            </Option>
          ))}
        </Options>
    </div>
  )
}


type optionsProps = {
  title?:ReactNode;
  selectedName?: KeyTextField,
  children?: ReactNode
}

function Options({title, selectedName, children}:optionsProps){
  const formattedName = selectedName?.replace(/-/g, " ");

  return (
    <div>
      <div className='flex'>
        <Heading as='h2' size='xs' className='mb-2'>
          {title}
        </Heading>
        <p>
          <span className='select-none text-zinc-500'>|  </span>
          {formattedName}
        </p>
      </div>
      <ul className='mb-1 flex flex-wrap gap-2'>
        {children}
      </ul>
    </div>
  )
}

type OptionProps = Omit<ComponentProps<"button">, "children"> & {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
} & (
  | {
    imageField: ImageField;
    imgixParams?: PrismicNextImageProps["imgixParams"];
    colorField?: never;
  }
  | {
    colorField: ColorField;
    imageField?: never;
    imgixParams?: never;
  }
)

function Option({children, selected, imageField, imgixParams, colorField, onClick}: OptionProps){
  return (
    <li>
      <button onClick={onClick} className={clsx("size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white", selected && "outline")}>
        {imageField ? (
          <PrismicNextImage field={imageField} imgixParams={imgixParams} className='pointer-events-none h-full w-full rounded-full' alt=''></PrismicNextImage>
        ) : 
        (
          <div className='h-full w-full rounded-full' style={{backgroundColor: colorField ?? undefined}}></div>
        )}

        <span className='sr-only'>{children}</span>
      </button>
    </li>
  )
}