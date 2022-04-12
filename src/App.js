import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import NavigationBar from "./routes/navigation/navigation.component";
import SignIn from "./routes/signIn/sign-in.component";

const Title = () => {
  return (
    <div>
      <h1>Title Page</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="title" element={<Title />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
