import './App.css';
import { logout } from './firebase';
import Chat from './components/Chat/Chat'

function App() {
  return (
    <>
    <button onClick={()=>logout()}>
      logout
    </button>
    <Chat/>
    </>
  );
}

export default App;