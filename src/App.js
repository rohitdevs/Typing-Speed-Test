import { GlobalStyles } from "./styles/global";
import TypingBox from "./Components/TypingBox";
import UpperMenu from "./Components/UpperMenu";
import Footer from "./Components/Footer";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import Header from "./Components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

const {theme}=useTheme();

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
<div className="canvas">
    <GlobalStyles/>
      <Header/>
      <TypingBox/>
      <Footer/>
    </div>
    </ThemeProvider>
    
  );
}

export default App;
