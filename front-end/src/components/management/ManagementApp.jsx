import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HeaderComponent1 from './HeaderComponent1'
import MainComponent from './MainComponent'
import RegisterComponent from './RegisterComponent'
import InformationComponent from './InformationComponent' 
import { useContext, useEffect } from 'react'


export default function ManagementApp(){
    return (
        <div className="ManagementApp">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainComponent />} />

        <Route path="/main" element={<MainComponent />} />

        <Route path="/register/:pubKey" element={<RegisterComponent />} />
        <Route path="/detail/:websiteMint" element={<InformationComponent />} />
      </Routes>
    </BrowserRouter>
        </div>
    )
}
