import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { useRouter } from "next/router";

interface WithAuthProps {
  isLoggedIn: boolean;
}

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const ComponentWithAuth = (props: WithAuthProps) => {
    const { isLoggedIn } = props;
    const router = useRouter();

    React.useEffect(() => {
      if (!isLoggedIn) {
        router.replace("/");
      }
    }, [isLoggedIn]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export const getServerSidePropsWithAuth: GetServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  try {
    const refreshToken = req.headers.cookie?.split(";")[0].split("=")[1];

    return {
      props: {
        isLoggedIn: !!refreshToken,
      },
    };
  } catch (error) {
    return {
      props: {
        isLoggedIn: false,
      },
    };
  }
};

export default withAuth;
