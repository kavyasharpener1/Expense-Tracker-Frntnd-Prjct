import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/layout/layout";
import UserProfile from "./components/profile/userprofile";
import AuthPage from "./pages/authpage";
import HomePage from "./pages/homepage";
import AuthContext from "./store/auth-context";
import ExpenseForm from "./components/expensesform/expenseform";
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
