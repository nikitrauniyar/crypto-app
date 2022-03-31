import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./Components/Header"
import Homepage from "./Components/Homepage";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(()=>({
  header: {
    backgroundColor: '#14161a',
    color: "white",
    minHeight: "100vh",
  },
}));

function App(props) {
  const classes = useStyles(props);
  return (
    <Router>
      <div className={classes.header}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage/>} exact/>
          <Route path="/coin/:id" element={<Homepage/>} exact/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
