
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import Sidebar from './components/Sidebar';
function App() {
  return (
    <div className="App">
      <div class="container">
        <div class="row">
          <div class="col-9"><AdminDashboard /></div>
          <div class="col-2" className="sidebar"><Sidebar /></div>
        </div>
      </div>
        
        
    </div>
  );
}

export default App;
