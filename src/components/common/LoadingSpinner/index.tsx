import {SyncLoader} from "react-spinners";
import {useEffect, useState} from "react";
import shark from "../../../assets/pictures/shark.svg";

export default function LoadingSpinner({timeout = 200}) {
  const [showSpinner, setShowSpinner] = useState(false);

  /**
   * [timeout]ms 후에 spinner를 보여준다.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, timeout);

    return () => clearTimeout(timer); // 메모리 누수 방지
  }, []);


  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {showSpinner && (
        <>
          <img className="w-[60px] h-[60px]" src={shark}/>
          <div className="h-[12px]"/>
          <SyncLoader color="#C6CFF8" size={10}/>
        </>
      )}
    </div>
  );
}