import './App.scss';
import Editor from './component/Editor/index';
import Navigation from './component/Navigation';

function App() {
  return (
    <div className="App" >
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1>Tier Maker</h1>
        <Editor />
      </div>
    </div>
  );
}

export default App;
