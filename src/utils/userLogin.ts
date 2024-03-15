import axios from 'axios';

interface ILoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export default function userLogin() {
  axios
    .post<ILoginResponse>('http://localhost:3000/api/login')
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
