import {useForm} from 'react-hook-form';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {TLoginFormInput} from '../../types';
import {login} from '../../data-provider/data-service';
import styles from './LoginPage.module.css';

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
  const {register, handleSubmit} = useForm<TLoginFormInput>(defaultValues);

  const onSubmit = (data: TLoginFormInput) => {
    loginQuery.mutate(data, {
      onSuccess: () => {
        navigate('search');
      },
    });
  };

  return (
    <div className={styles.loginCardWrapper}>
      <Card className={styles.loginCard}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <InputText
            className={styles.nameInput}
            id="name"
            {...register('name', {required: true})}
            placeholder="Name"
          />
          <InputText
            className={styles.emailInput}
            id="email"
            {...register('email', {required: true})}
            placeholder="Email"
          />
          <Button className={styles.submitButton} label="Submit" type="submit" />
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
