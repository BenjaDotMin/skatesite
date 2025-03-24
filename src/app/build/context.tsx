"use client";

import { Content } from "@prismicio/client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type CustomiserControlsContext = {
    selectedWheel?: Content.BoardCustomiserDocumentDataWheelsItem; //optional
    setWheel: (wheel:Content.BoardCustomiserDocumentDataWheelsItem) => void;
    selectedDeck?: Content.BoardCustomiserDocumentDataDecksItem; //optional
    setDeck: (deck:Content.BoardCustomiserDocumentDataDecksItem) => void;
    selectedTruck?: Content.BoardCustomiserDocumentDataMetalsItem; //optional
    setTruck: (truck:Content.BoardCustomiserDocumentDataMetalsItem) => void;
    selectedBolt?: Content.BoardCustomiserDocumentDataMetalsItem; //optional
    setBolt: (bolt:Content.BoardCustomiserDocumentDataMetalsItem) => void;
}

const defaultContext: CustomiserControlsContext = {
    setWheel: () => {},
    setDeck: () => {},
    setTruck: () => {},
    setBolt: () => {}
};

const CustomiserControlsContext = createContext(defaultContext);

type CustomiserControlsProviderProps = {
    defaultWheel?: Content.BoardCustomiserDocumentDataWheelsItem; //optional
    defaultDeck?: Content.BoardCustomiserDocumentDataDecksItem; //optional
    defaultTruck?: Content.BoardCustomiserDocumentDataMetalsItem; //optional
    defaultBolt?: Content.BoardCustomiserDocumentDataMetalsItem; //optional
    children?: ReactNode //optional
}

export function CustomiserControlsProvider({defaultWheel, defaultDeck, defaultTruck, defaultBolt, children}: CustomiserControlsProviderProps){

    const [selectedWheel, setWheel] = useState(defaultWheel);
    const [selectedDeck, setDeck] = useState(defaultDeck);
    const [selectedTruck, setTruck] = useState(defaultTruck);
    const [selectedBolt, setBolt] = useState(defaultBolt);

    const value = useMemo<CustomiserControlsContext>(() => {
        return {selectedWheel, setWheel, selectedDeck, setDeck, selectedTruck, setTruck, selectedBolt, setBolt}
    }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt]);

    return (
        <CustomiserControlsContext.Provider value={value}>
            {children}
        </CustomiserControlsContext.Provider>
    )
}

export function useCustomiserControls(){
    return useContext(CustomiserControlsContext);
}

// const {selectedDeck} = useCustomiserControls();