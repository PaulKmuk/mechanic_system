'use client';

import { useRouter } from "next/navigation";
import { ArrowLeftCircle, ArrowRight } from "lucide-react";

type HeaderPageProps = {
    items: string[];
};

function HeaderPage({ items }: HeaderPageProps) {

    const router = useRouter();
    const showBackButton = items.length > 1;

    return ( 
        <div className="pageHeaderContener">

            {showBackButton && (
                <button 
                    className="pageHeaderBackBtn"
                    onClick={() => router.back()}
                >
                    <ArrowLeftCircle />
                </button>
            )}

            {items.map(element => (
                <h2 key={element} className="pageHeaderElement">
                    {showBackButton && (items[0] !== element) && (
                        <ArrowRight size={14}/>
                    )}
                    {element}
                </h2>
            ))}

        </div>
    );
}

export default HeaderPage;