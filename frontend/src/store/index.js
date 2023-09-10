import { fazerLogin } from '../actions/login';
import { store } from './configureStore';

const fazerLoginFe = fazerLogin('Fe', 123); //criando acao
store.dispatch(fazerLoginFe);

console.log(store.getState());