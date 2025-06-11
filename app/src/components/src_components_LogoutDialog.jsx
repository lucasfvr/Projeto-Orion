import React, { useEffect, useRef } from 'react';

function LogoutDialog({ open, onConfirm, onCancel }) {
  const ref = useRef();

  useEffect(() => {
    if (open) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  }, [open]);

  return (
    <dialog ref={ref} className="dialog">
      <div className="card text-center alert alert-secondary rounded-5">
        <div className="card-body">
          <p className="card-text fs-2">
            Já vai? A masmorra final ainda nem foi explorada! Tem certeza que quer sair??
          </p>
          <hr />
          <button onClick={onConfirm} className="btn btn-danger fs-4 me-3">Sair</button>
          <button onClick={onCancel} className="btn btn-secondary fs-4 ms-3">Cancelar</button>
        </div>
      </div>
    </dialog>
  );
}

export default LogoutDialog;