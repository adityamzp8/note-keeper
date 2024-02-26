import { useState } from "react";
import SearchBox from "./SearchBox";
import Information from "./information";

export default function weatherApp() {
  const [weatherInfo, setweatherInfo] = useState({});
  let updateinfo = (newinfo) => {
    setweatherInfo(newinfo);
  };
  return (
    <div>
      <SearchBox updateinfo={updateinfo} />
      <Information info={weatherInfo} />
    </div>
  );
}
