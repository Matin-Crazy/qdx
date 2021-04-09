import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import AboutUsPage from "../components/AboutUsPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";
import HomePage from "../components/HomePage";
import ContactUsPage from "../components/ContactUsPage";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/aboutus" component={AboutUsPage} />
        <Route path="/contactus" component={ContactUsPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

// <Switch>
// <Route path="/" component={ExpenseDashboardPage} exact={true} />
// <Route path="/create" component={AddExpensePage} />
// <Route path="/edit/:id" component={EditExpensePage} />
// <Route path="/help" component={HelpPage} />
// <Route component={NotFoundPage} />
// </Switch>

export default AppRouter;