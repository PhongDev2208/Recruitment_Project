import AllRoute from "./components/AllRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <AllRoute />
    </ErrorBoundary>
  );
}

export default App;
