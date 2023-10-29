import { GlobalStyles } from "./styles/global";
import TypingBox from "./Components/TypingBox";
import UpperMenu from "./Components/UpperMenu";
import Footer from "./Components/Footer";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";


function App() {

const {theme}=useTheme();

  return (
    <ThemeProvider theme={theme}>
<div className="canvas">
    <GlobalStyles/>
      <div>Header</div>
      <TypingBox/>
      <Footer/>
    </div>
    </ThemeProvider>
    
  );
}

export default App;
