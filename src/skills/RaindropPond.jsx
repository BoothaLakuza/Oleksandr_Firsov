import React from 'react';
import './RaindropPond.css';

const Raindrop = ({ duration, delay, transform, symbol }) => (
  <div className="rain" style={{ '--duration': duration, '--delay': delay, transform }}>
    <div className="drop"></div>
    <div className="waves">
      <div></div>
      <div></div>
    </div>
    <div className="splash"></div>
    <div className="particles">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className="symbol">{symbol}</div>
  </div>
);

const RaindropPond = () => {
  const raindrops = [
    { duration: '2.7s', delay: '1s', transform: 'translate(10%, 10%) scale(0.9)', symbol: 'HTML' },
    { duration: '2.1s', delay: '1.2s', transform: 'translate(-20%, 40%) scale(1.3)', symbol: 'CSS' },
    { duration: '2.3s', delay: '2s', transform: 'translate(0%, 50%) scale(1.1)', symbol: 'JS' },
    { duration: '2s', delay: '4s', transform: 'translate(0%, -10%) scale(1.2)', symbol: 'React' },
    { duration: '2.5s', delay: '0s', transform: 'translate(10%, 0%) scale(0.9)', symbol: 'C#' },
    { duration: '2s', delay: '2.7s', transform: 'translate(-20%, 0%) scale(1)', symbol: 'Node' },
    { duration: '1.8s', delay: '1.3s', transform: 'translate(20%, -40%) scale(1.2)', symbol: 'Python' },
    { duration: '2.2s', delay: '0s', transform: 'translate(20%, 0%) scale(1)', symbol: 'Django' },
    { duration: '2s', delay: '0.5s', transform: 'translate(0%, -10%) scale(1.3)', symbol: 'SQL' },
  ];

  return (
    <div className="container">
      {raindrops.map((drop, index) => (
        <div className="row" key={index}>
          <Raindrop {...drop} />
        </div>
      ))}
    </div>
  );
};

export default RaindropPond;
