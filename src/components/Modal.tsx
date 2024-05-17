import React from "react";

type modalType = {
  visible?: Boolean;
  title?: String;
  children?: any;
  open?: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Modal: React.FC<modalType> = ({ visible, title, children, open }) => {
  if (!visible) return;

  const close = () => {
    open?.(false);
  };
  return (
    <div className="modal-root">
      <div className="modal-wrap" role="dialog">
        <div className="modal" role="document">
          <div className="modal-content">
            <div className="modal-title">
              <span className="title">{title}</span>
              <span className="close" onClick={close}>
                X
              </span>
            </div>
            <button
              type="button"
              aria-label="Close"
              className="modal-close"
            ></button>

            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
