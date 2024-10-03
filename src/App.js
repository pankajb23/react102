import logo from './logo.svg';
import './App.css';
import TaskLayout from './js/WelcomePage.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  console.log("App.js");
  return (
    <div className="screen">
      <div className="frame">
        {TaskLayout()}
      </div></div>);
}

export default App;
