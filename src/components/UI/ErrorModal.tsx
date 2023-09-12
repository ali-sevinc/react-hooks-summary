import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

import "./ErrorModal.css";

interface PropType {
  children?: ReactNode;
  onClose: () => void;
}

const ErrorModal = React.memo(function ({ children, onClose }: PropType) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="error-modal">
        <h2>An Error Occurred!</h2>
        <p>{children}</p>
        <div className="error-modal__actions">
          <button type="button" onClick={onClose}>
            Okay
          </button>
        </div>
      </div>
    </>,
    document.getElementById("modal-overlay")!
  );
});

export default ErrorModal;
