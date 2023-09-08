import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import AuthContext from "./Store/Auth-Context";
import ExpenseForm from "./components/ExpensesForm/ExpenseForm";
import { useContext } from "react";

function App() {
  const authCtx = useContext(AuthContext);


  return (
    
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/expense" exact>
            {authCtx.isLoggedIn && (<ExpenseForm />)}
          </Route>

          {!authCtx.isLoggedIn && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}

          <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile/>}
            {!authCtx.isLoggedIn && <Redirect to="/auth" /> }
          </Route>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
   
  );
}

export default App;
