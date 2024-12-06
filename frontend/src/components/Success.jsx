import { useState } from "react";

const Success = ({ msg }) => {

    const [displayed, setDisplayed] = useState(true);

    setTimeout(() => setDisplayed(false), 2000);
    return (
        <div>
            {displayed &&
                <div className="bg-green-500 text-white px-2 rounded-md mt-6 text-sm mb-4">
                    <i className="fa-solid fa-circle-check"></i> {msg}
                </div>}
        </div>
    );
};

export default Success;