import {useForm} from 'react-hook-form';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {IFormInput} from '../types';
import {login} from '../data-provider/data-service';

const LoginPage = () => {
  const navigate = useNavigate();

  const defaultValues = {
    name: '',
    email: '',
  };

  const loginQuery = useMutation({
    mutationFn: login,
  });

  //@ts-ignore
  const {register, handleSubmit} = useForm<IFormInput>(defaultValues);

  const onSubmit = (data: IFormInput) => {
    loginQuery.mutate(data, {
      onSuccess: () => {
        navigate('search');
      },
    });
  };

  return (
    <div>
      login page
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText id="name" {...register('name', {required: true})} placeholder="Name" />
        <InputText id="email" {...register('email', {required: true})} placeholder="Email" />
        <Button label="Submit" type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
