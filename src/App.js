// src\App.js
import "./App.css";
import Main from "./Components/Main";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
    return (
        <div>
            {/* connect app.js with redux */}
            <Provider store={store}>
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
