import '../css/top.css';
import top2 from '../img/foto1.jpg';
import top1 from '../img/top1.jpg';
import top3 from '../img/foto2.jpg';

function Top() {

return (
<div className='Top'>
    <div className='img-container'>
    <div id='top2'>
        <h1 className='TopText'>TOP 2</h1>
        <img src={top2} alt='top2'/>
    </div>
    <div id='top1'>
        <h1 className='TopText'>TOP 1</h1>
        <img src={top1} alt='top1'/>
    </div>
    <div id='top3'>
        <h1 className='TopText'>TOP 3</h1>
        <img src={top3} alt='top3'/>
    </div>
    </div>
</div>
);

}

export default Top;