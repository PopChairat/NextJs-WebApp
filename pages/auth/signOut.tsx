//#region Required
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
//#endregion

//#region UI Components
import PageContainer from "@/components/layouts/PageContainer";
//#endregion

//#region Types
//#endregion

//#region service
import { useRouter } from "next/router";
import jsonwebtoken from "jsonwebtoken";
import Cookies from "universal-cookie";
import { Authorization } from "@/models/constants/key.constant";
//#endregion

const SignOutPage: NextPage = () => {
  const router = useRouter();
  const cookies = new Cookies();
  const [loading, setLoading]: [boolean, Function] = useState(true);

  useEffect(() => {
    revokeJwt();
  }, []);

  const revokeJwt = () => {
    setTimeout(() => {
      cookies.remove(Authorization, { path: "/" });
      router.push("/");
    }, 1000);
  };

  return (
    <PageContainer
      pageName="Sign In"
      loading={loading}
      loadingMessage="Signing Out..."
    ></PageContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  var jwt = jsonwebtoken.decode(req.cookies.authorization);
  if (!jwt) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return {
      props: {},
    };
  }

  const cookies = new Cookies(req.headers.cookies);
  cookies.remove(Authorization);
  return { props: {} };
};
export default SignOutPage;
