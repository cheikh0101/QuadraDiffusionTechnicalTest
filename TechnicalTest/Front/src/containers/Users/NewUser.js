import { useTranslation } from 'react-i18next';
import { newUser, getUser } from "../../api/users";
import { useAsync } from "react-async";
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin-bottom: 15px;
`;

const NewUser = () => {

  const { t } = useTranslation('user');
  const { data } = useAsync({ promiseFn: getUser });
  const navigate = useNavigate();
  const user = {login: '',
    email: '',password:''};
  const formik = useFormik({
    initialValues: user,
    enableReinitialize: true,
      onSubmit: async (values) => {
      await newUser(values);
      navigate('/users');
    },
  });
  return (
        <form onSubmit={formik.handleSubmit}>
          <FieldContainer>
            <TextField id="login" name="login" label={t('LOGIN')} variant="standard" 
                       />
          </FieldContainer>

          <FieldContainer>
            <TextField id="email" name="email" type="email" label={t('EMAIL')} variant="standard"
              />
          </FieldContainer>

          <FieldContainer>
            <TextField
              id="password"
              name="password"
              label={t('PASSWORD')}
              variant="standard"
            />
          </FieldContainer>

          <button type="submit">{t('SUBMIT')}</button>
      </form>
      
  );
};

export default NewUser;

