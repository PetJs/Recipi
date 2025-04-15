import { createPortal } from "react-dom";
import Connect from "@/pages/auth-connect";

const ConnectModal: React.FC = () => {
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <Connect />
    </div>,
    document.body
  );
};

export default ConnectModal;
