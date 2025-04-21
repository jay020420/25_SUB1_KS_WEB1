import { useState, useEffect } from "react";

function StayTimer() {
    const [second, setSecond] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setSecond(prevSeconds => prevSeconds+1);
        }, 1000);
    }, []);

    return (
        <div>
            페이지에 머무른 시간: {second}초
        </div>
    );
}

export default StayTimer