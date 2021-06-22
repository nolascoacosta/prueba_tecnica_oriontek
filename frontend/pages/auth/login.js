import { getSocialAuthLinks } from "../../helpers/getSocialAuthLinks";
import CredentialsSignUp from "../../components/CredentialsSignUp";
import SocialSignup from "../../components/SocialSignup";

const Login = ({googleService, facebookService}) => {

  return (
    <>
      <CredentialsSignUp title="Sign In with Email" buttonText="Sign In with credentials" login />
      {/*<SocialSignup url='/' service="Forgot your password?" styleButton="w-full flex justify-center py-2 px-4 " />*/}
      <SocialSignup url={facebookService} service="Sign In with Facebook" styleButton="auth_facebook" />
      <SocialSignup url={googleService} service="Sign In with Google" styleButton="auth_google" />
      <SocialSignup url='/auth/signup' service="Don't have an account? Sign Un" styleButton="mt-2 w-full flex justify-center py-2 px-4" />
    </>
  );
};

export async function getStaticProps(context) {
  let [googleService, facebookService] = await getSocialAuthLinks();
  return {
    props: {
      googleService, facebookService
    },
    revalidate: 60,
  }
}

export default Login;