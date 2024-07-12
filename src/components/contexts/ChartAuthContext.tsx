import { createContext, useContext, useState } from "react";
export const ChartAuthContext = createContext(null);
export const useAuthChartContext = () => {
    return useContext(ChartAuthContext);
}
const ChartAuthContexProvider = ({ children }) => {
    const getLocalstroage = localStorage.getItem('Chart_Auth_User_Data')
    const [ChartAuthUser, SetChartAuthUser] = useState(getLocalstroage ? JSON.parse(getLocalstroage) : "" || null)
    return <ChartAuthContext.Provider value={{ ChartAuthUser, SetChartAuthUser }} >
        {children}
    </ChartAuthContext.Provider>
}

export default ChartAuthContexProvider;
