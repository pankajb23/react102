import logo from './logo.svg';
import './App.css';
import MainPage from "./js/attempt2/MainPage";
import TaskLayout from './js/WelcomePage.js';

const experiment = true    // Change this to true to see the new layout;
function App() {
  return (<>
    {experiment ? MainPage() :TaskLayout()}
  </>);
}

export default App;
