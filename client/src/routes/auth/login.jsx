import "./Login.css";
import {
  Form,
  Link,
  useLocation,
  useNavigation,
  useActionData,
  redirect
} from "react-router-dom";
import { authenticate, getAuthData } from "../../services/auth";
import ErrorField from "../../components/ErrorField";

const loader = async () => {
  const { user } = getAuthData();
  if (user) {
    return redirect("/");
  }
  return null;
};

const action = async ({ request }) => {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  if (!email) {
    return {
      error: { email: "You must provide a email to log in" },
    };
  }

  if (!password) {
    return {
      error: { password: "You must provide a password to log in" },
    };
  }

  try {
    await authenticate(email, password);
  } catch (error) {
    return {
      error: { general: error.message },
    };
  }

  let redirectTo = formData.get("redirectTo") || null;
  return redirect(redirectTo || "/");
};

const Login = () => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("email") != null;

  let actionData = useActionData();

  return (
    <section className="login-section">
      <h2>Sign in</h2>
      {from !== "/" ? (
        <p>You must log in to view the page at {from}</p>
      ) : (
        <p>Get access to all the features</p>
      )}
      <Form method="post" className="login-form">
        <input type="hidden" name="redirectTo" value={from} />
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="e-mail"
            autoComplete="email"
            defaultValue="tester@devine.be"
            className="login-input"
          />
          <ErrorField data={actionData} field="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            defaultValue="tester"
            className="login-input"
          />
          <ErrorField data={actionData} field="password" />
        </div>
        <div>
          <ErrorField data={actionData} field="general" />
          <button type="submit" className="login-button" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
          <Link to="/register" className="login-link">
            ...or Sign up!
          </Link>
        </div>
      </Form>
    </section>
  );
};

Login.action = action;
Login.loader = loader;

export default Login;
