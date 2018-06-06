import web3 from './web3';
import { interface as ABI } from './Lottery.json';
import address from './address.json';

const contract = new web3.eth.Contract(JSON.parse(ABI), address);

export default contract;
