import { useUserStore } from "@/store/userStore";
import ConnectModal from "@/portal";

type ProtectedRouteProps = {
  children?: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, accessHash } = useUserStore();
  const isAuthenticated = Boolean(user?.username && accessHash);

  return (
    <>
      {children}
      {!isAuthenticated && <ConnectModal />}
    </>
  );
};

export default ProtectedRoute;
