import * as React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';

function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(searchParams.get('backdrop') === 'true');

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    searchParams.delete('backdrop');
    setSearchParams(searchParams);
    navigate('/');
  };

  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            color: '#fff',
            width: '150px',
            height: '100px',
            backgroundColor: '#3f51b5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Logging In...
        </div>
      </Backdrop>
    </div>
  );
}

export default Login;