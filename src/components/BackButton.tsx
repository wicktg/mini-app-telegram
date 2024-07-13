import React from "react";

type Props {
    goBack: () => void;
}

const BackButton: React.FC<Props> = ({ goBack }) => { 
    return (
        <div className="flex p-4 text-sm justify-start">
            <img onClick={ goBack}  />
        </div>
    )
}