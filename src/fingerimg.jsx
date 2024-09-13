import f0 from './img/fingers/0.jpg';
import f1 from './img/fingers/1.jpg';
import f2 from './img/fingers/2.jpg';
import f3 from './img/fingers/3.jpg';
import f4 from './img/fingers/4.jpg';
import f5 from './img/fingers/5.jpg';
import f6 from './img/fingers/6.jpg';
import f10 from './img/fingers/IMG-20240810-WA0012.jpg';

export function fingerUpdate(x, setfinger) {
  switch (x) {
    case 1:
      setfinger(f1);
      break;
    case 2:
      setfinger(f2);
      break;
    case 3:
      setfinger(f3);
      break;
    case 4:
      setfinger(f4);
      break;
    case 5:
      setfinger(f5);
      break;
    case 6:
      setfinger(f6);
      break;
    case 10:
      setfinger(f10);
      break;
    default:
      setfinger(f0); 
      break;
  }
  setTimeout(() => {
    setfinger(f0);
  }, 2000);
}
