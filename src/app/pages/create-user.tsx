import React from 'react';
import UserFormModal from '../components/UserFormModal';

const CreateUserPage = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <UserFormModal isOpen={open} onClose={() => setOpen(false)} onSubmit={() => {}} />
  );
};

export default CreateUserPage; 